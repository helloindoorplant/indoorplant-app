import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Package, Truck, CreditCard, User, ArrowLeft, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import { OrderAdminControls } from '@/components/admin/OrderAdminControls';

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = order.totalAmount - subtotal;

  const getStatusBadge = (status: string) => {
    switch(status.toUpperCase()) {
      case "PENDING": return "bg-gray-100 text-gray-800";
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "SHIPPED": return "bg-indigo-100 text-indigo-800";
      case "DELIVERED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      case "REFUNDED": return "bg-orange-100 text-orange-800";
      case "RETURNED": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Order {order.id.slice(-6).toUpperCase()}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> 
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Order Items & Payment Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      {item.product?.images ? (
                        <img 
                          src={JSON.parse(item.product.images)[0]} 
                          alt={item.product.name} 
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{item.product?.name || "Unknown Product"}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} {item.potColor ? `• Pot: ${item.potColor}` : ''}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <p>Subtotal ({order.items.reduce((acc, item) => acc + item.quantity, 0)} items)</p>
                  <p>₹{subtotal.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>Shipping</p>
                  <p>₹{shipping > 0 ? shipping.toLocaleString("en-IN") : "0"}</p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-gray-900 text-base">
                  <p>Total Paid</p>
                  <p>₹{order.totalAmount.toLocaleString("en-IN")}</p>
                </div>
              </div>
              
              {order.paymentId && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Razorpay Payment ID</p>
                  <p className="font-mono text-sm text-gray-900">{order.paymentId}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Customer, Shipping & Controls */}
        <div className="space-y-6">
          
          {/* Admin Controls */}
          <OrderAdminControls orderId={order.id} currentStatus={order.status} />

          {/* Customer Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
            </div>
            {order.user ? (
              <div className="space-y-3">
                <p className="font-medium text-gray-900">{order.user.name || "Guest User"}</p>
                <a href={`mailto:${order.user.email}`} className="text-sm text-primary hover:underline flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {order.user.email}
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Guest Checkout</p>
            )}
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {order.shippingAddr || "No shipping address provided."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
