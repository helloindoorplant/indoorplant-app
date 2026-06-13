"use client";

import { useState } from "react";
import { Search, Mail, MoreVertical } from "lucide-react";

export function CustomersTable({ customers }: { customers: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(c => 
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.map((customer) => {
              const totalOrders = customer.orders?.length || 0;
              const totalSpent = customer.orders?.reduce((sum: number, o: any) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0) || 0;
              
              return (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{customer.name || "Guest User"}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Joined {new Date(customer.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{totalOrders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{totalSpent.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <p className="text-sm text-gray-500">Showing {filteredCustomers.length} of {customers.length} customers</p>
      </div>
    </div>
  );
}
