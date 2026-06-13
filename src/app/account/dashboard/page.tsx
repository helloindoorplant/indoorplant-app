"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Package, Heart, Leaf, ArrowRight } from "lucide-react";

interface RecentOrder {
  id: string;
  date: string;
  status: string;
  total: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const wishlist = useUserStore((state) => state.wishlist);
  const plantJournal = useUserStore((state) => state.plantJournal);

  const [totalOrders, setTotalOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/user/dashboard');
        if (res.ok) {
          const data = await res.json();
          setTotalOrders(data.totalOrders);
          setRecentOrders(data.recentOrders);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const stats = [
    { name: "Total Orders", value: isLoading ? "-" : totalOrders.toString(), icon: Package, color: "bg-blue-100 text-blue-600" },
    { name: "Wishlist Items", value: wishlist.length.toString(), icon: Heart, color: "bg-rose-100 text-rose-600" },
    { name: "My Plants", value: plantJournal.length.toString(), icon: Leaf, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Guest"}! 🌿
        </h1>
        <p className="mt-2 text-gray-600">
          Here is an overview of your plant journey and recent activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-primary font-medium hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-16"></div>
              </div>
            ) : recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{order.total.toLocaleString('en-IN')}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
                <Link href="/shop" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Plant Care Reminders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Plant Care Reminders</h2>
            <Link href="/account/dashboard#plants" className="text-sm text-primary font-medium hover:underline flex items-center">
              My Plants <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {plantJournal.length > 0 ? (
              plantJournal.map((entry) => (
                <div key={entry.id} className="flex items-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center shadow-sm">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-900">{entry.plantName}</p>
                    <p className="text-sm text-gray-500">Time to water!</p>
                  </div>
                  <button className="text-sm font-medium text-primary hover:text-primary/80 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
                    Mark Watered
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <Leaf className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No plants in your journal yet.</p>
                <button className="mt-2 text-sm font-medium text-primary hover:underline">
                  Add your first plant
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
