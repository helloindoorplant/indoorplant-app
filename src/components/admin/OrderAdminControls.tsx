"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateOrderStatus, cancelOrder, processRefund, processReturn } from "@/app/admin/orders/actions";
import { Loader2, Ban, RefreshCcw, PackageX } from "lucide-react";

export function OrderAdminControls({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    await updateOrderStatus(orderId, e.target.value);
    setIsUpdating(false);
  };

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setIsUpdating(true);
      await cancelOrder(orderId);
      setIsUpdating(false);
    }
  };

  const handleRefund = async () => {
    if (confirm("Are you sure you want to mark this order as refunded? (This only updates the database status)")) {
      setIsUpdating(true);
      await processRefund(orderId);
      setIsUpdating(false);
    }
  };

  const handleReturn = async () => {
    if (confirm("Mark this order as returned to inventory?")) {
      setIsUpdating(true);
      await processReturn(orderId);
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Admin Actions</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
          <div className="flex gap-2">
            <select
              value={currentStatus}
              onChange={handleStatusChange}
              disabled={isUpdating}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-100"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
              <option value="Returned">Returned</option>
            </select>
            {isUpdating && <Loader2 className="w-5 h-5 animate-spin text-gray-400 my-auto" />}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-2">
          {currentStatus !== "Cancelled" && currentStatus !== "Refunded" && currentStatus !== "Returned" && (
            <Button 
              variant="destructive" 
              className="w-full justify-start" 
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <Ban className="w-4 h-4 mr-2" /> Cancel Order
            </Button>
          )}

          {currentStatus !== "Refunded" && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200" 
              onClick={handleRefund}
              disabled={isUpdating}
            >
              <RefreshCcw className="w-4 h-4 mr-2" /> Process Refund
            </Button>
          )}

          {currentStatus === "Delivered" && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200" 
              onClick={handleReturn}
              disabled={isUpdating}
            >
              <PackageX className="w-4 h-4 mr-2" /> Mark as Returned
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
