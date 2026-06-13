import { PrismaClient } from "@prisma/client";
import { OrdersTable } from "@/components/admin/OrdersTable";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
