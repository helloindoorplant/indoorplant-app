"use server";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

import { sendOrderStatusUpdateEmail } from '@/lib/email';

export async function updateOrderStatus(orderId: string, status: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: { user: true, items: { include: { product: true } } }
  });

  if (status === "Shipped" || status === "Delivered") {
    try {
      const emailStatus = status === "Shipped" ? "shipped" : "delivered";
      await sendOrderStatusUpdateEmail(
        order.user?.email || "guest@example.com",
        order.user?.name || "Customer",
        order.id,
        emailStatus
      );
    } catch (error) {
      console.error("Failed to send status update email:", error);
    }
  }

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function cancelOrder(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "Cancelled" }
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function processRefund(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "Refunded" }
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function processReturn(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "Returned" }
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
