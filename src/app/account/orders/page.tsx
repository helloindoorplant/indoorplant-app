"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Download, Package, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  trackingNo: string;
}

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/user/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => 
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Delivered": return "bg-gray-100 text-gray-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const generateInvoicePDF = (order: Order) => {
    const doc = new jsPDF();
    
    // Add Brand Header (Text-based to act as logo)
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(27, 67, 50); // Deep green
    doc.text("INDOOR PLANT", 14, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Kolkata, India", 14, 32);
    doc.text("support@indoorplant.in", 14, 37);

    // Add Invoice Details
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`INVOICE`, 140, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: #${order.id}`, 140, 32);
    doc.text(`Date: ${order.date}`, 140, 37);

    // Line separator
    doc.setDrawColor(230, 230, 230);
    doc.line(14, 45, 196, 45);

    // Prepare Table Data
    const tableData = order.items.map(item => [
      item.name,
      item.quantity.toString(),
      `Rs. ${item.price.toLocaleString("en-IN")}`,
      `Rs. ${(item.price * item.quantity).toLocaleString("en-IN")}`
    ]);

    const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = order.total - subtotal;

    // Add Table
    autoTable(doc, {
      startY: 55,
      head: [['Item', 'Quantity', 'Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [27, 67, 50], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 5 },
      margin: { left: 14, right: 14 }
    });

    // Add Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Subtotal:", 140, finalY);
    doc.text(`Rs. ${subtotal.toLocaleString("en-IN")}`, 170, finalY);

    doc.text("Shipping:", 140, finalY + 7);
    doc.text(`Rs. ${shipping > 0 ? shipping.toLocaleString("en-IN") : "0"}`, 170, finalY + 7);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total:", 140, finalY + 17);
    doc.text(`Rs. ${order.total.toLocaleString("en-IN")}`, 170, finalY + 17);

    // Save PDF
    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-playfair text-gray-900">My Orders</h1>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      Order {order.id}
                      <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => generateInvoicePDF(order)}>
                      <Download className="w-4 h-4 mr-2" /> Invoice
                    </Button>
                    <Button variant="default" size="sm">
                      Track Order
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-600">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mt-1">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>{item.quantity}x {item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 mb-1">Order Total</p>
                      <p className="font-semibold text-gray-900">₹{order.total.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? "Try adjusting your search terms." : "You haven't placed any orders yet."}
            </p>
            {!search && (
              <div className="mt-6">
                <Link href="/shop">
                  <Button className="h-11 rounded-lg px-6">Start Shopping</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
