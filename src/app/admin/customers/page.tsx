import { PrismaClient } from "@prisma/client";
import { CustomersTable } from "@/components/admin/CustomersTable";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminCustomers() {
  const customers = await prisma.user.findMany({
    where: { role: "USER" },
    include: {
      orders: {
        select: {
          totalAmount: true,
          status: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your customer base and view their history.</p>
        </div>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
