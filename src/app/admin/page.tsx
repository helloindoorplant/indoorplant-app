import { PrismaClient } from "@prisma/client";
import { 
  TrendingUp, 
  Package, 
  Users, 
  AlertCircle,
  ArrowUpRight,
  Leaf
} from "lucide-react";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  // Fetch Real Data from Prisma
  const [revenueResult, pendingOrders, recentUsers, lowStockProducts, recentOrdersList] = await Promise.all([
    prisma.order.aggregate({
      where: { status: { not: "CANCELLED" } },
      _sum: { totalAmount: true }
    }),
    prisma.order.count({
      where: { status: "PENDING" }
    }),
    prisma.user.count({
      where: { role: "USER", createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
    }),
    prisma.product.count({
      where: { stock: { lt: 5 } }
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true }
    })
  ]);

  const totalRevenue = revenueResult._sum.totalAmount || 0;

  const kpis = [
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, trend: "+12%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { title: "Pending Orders", value: pendingOrders.toString(), trend: "New", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "New Customers", value: recentUsers.toString(), trend: "7 days", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Low Stock Alerts", value: lowStockProducts.toString(), trend: "Action", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  const recentActivity = recentOrdersList.map(order => ({
    id: order.id,
    type: "order",
    message: `New order #${order.id.slice(-6).toUpperCase()} from ${order.user?.name || order.user?.email || "Guest"}`,
    time: new Date(order.createdAt).toLocaleDateString() + ' ' + new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  }));

  // Fetch past 7 days revenue for the chart
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentDaysOrders = await prisma.order.findMany({
    where: { createdAt: { gte: sevenDaysAgo }, status: { not: "CANCELLED" } },
    select: { totalAmount: true, createdAt: true }
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  
  // Initialize chart array with 0 for last 7 days ending today
  const chartData = Array(7).fill(0).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: days[d.getDay()],
      total: 0
    };
  });

  recentDaysOrders.forEach(order => {
    const diffDays = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 3600 * 24));
    if (diffDays < 7 && diffDays >= 0) {
      chartData[6 - diffDays].total += order.totalAmount;
    }
  });

  const maxTotal = Math.max(...chartData.map(d => d.total), 1); // avoid div by 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {kpi.trend} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview (Last 7 Days)</h3>
          <div className="flex items-end h-[300px] gap-2">
            {chartData.map((data, i) => {
              const heightPercentage = Math.max((data.total / maxTotal) * 100, 2); // min 2% height
              return (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                  <div 
                    className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary transition-colors relative"
                    style={{ height: `${heightPercentage}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                      ₹{data.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs font-medium text-gray-500 px-2">
            {chartData.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent activity.</p>
          ) : (
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="mt-1">
                    {activity.type === "order" && <Package className="w-5 h-5 text-blue-500" />}
                    {activity.type === "stock" && <AlertCircle className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 leading-snug">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
