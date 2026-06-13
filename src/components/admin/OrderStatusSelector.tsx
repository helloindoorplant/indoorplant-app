"use client";

import { updateOrderStatus } from "@/app/admin/orders/actions";
import { useTransition } from "react";

const WORKFLOW_STEPS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusSelector({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(() => {
      updateOrderStatus(orderId, newStatus);
    });
  };

  return (
    <select 
      disabled={isPending}
      value={currentStatus}
      onChange={handleStatusChange}
      className={`text-xs px-2 py-1 border border-gray-200 rounded cursor-pointer outline-none focus:ring-1 focus:ring-primary ${isPending ? 'opacity-50' : ''}`}
    >
      {WORKFLOW_STEPS.map(status => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  );
}
