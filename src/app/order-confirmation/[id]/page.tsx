import Link from 'next/link';
import { CheckCircle2, Package, Truck, ArrowRight, Share2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const { id } = params;

  let order = null;
  if (id !== 'creator-order') {
    order = await prisma.order.findUnique({
      where: { id }
    });
  }

  // If order is not found, we can either 404 or just show generic. We'll show generic if 'creator-order' fallback
  const isGeneric = !order;

  // Mock Date for Delivery (3 days from createdAt or now)
  const deliveryDate = order ? new Date(order.createdAt) : new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      
      {/* Success Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-14 h-14 text-green-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1B4332] mb-4">
          Order Confirmed! 🌱
        </h1>
        <p className="text-xl text-muted-foreground font-medium mb-6">
          Thank you! We've received your order and are getting it ready.
        </p>
        <div className="bg-primary/5 border border-primary/20 px-6 py-3 rounded-2xl flex items-center gap-4">
          <span className="text-muted-foreground font-medium">Order ID:</span>
          <span className="text-2xl font-extrabold text-primary tracking-wider">{id === 'creator-order' ? 'FREE-GIFT' : id}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Left Column: Tracking & AI Advisor */}
        <div className="space-y-8">
          
          {/* Tracking Timeline */}
          <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-extrabold mb-8 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" /> Delivery Status
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-border/50">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute md:relative left-0 md:left-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-primary/5 border border-primary/20 ml-12 md:ml-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-primary">Order Placed</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">We have received your order.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute md:relative left-0 md:left-auto">
                  <Package className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 ml-12 md:ml-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-400">Processing</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* AI Advisor Prompt */}
          <div className="bg-[#F8FFF9] rounded-3xl p-8 border border-primary/20 text-center">
            <h3 className="text-xl font-extrabold text-[#1B4332] mb-3">Plant Parent Tip!</h3>
            <p className="text-muted-foreground font-medium mb-6">
              Need care instructions for your new green friend? PlantBot is here to help!
            </p>
            <Link href="/ai-advisor">
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10">
                Ask PlantBot <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>

        {/* Right Column: Order Details */}
        <div className="space-y-8">
          
          <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm">
            <h2 className="text-xl font-extrabold mb-6 border-b border-border/40 pb-4">Order Details</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">Estimated Delivery</h4>
                  <p className="text-lg font-extrabold text-[#1B4332]">{formattedDate}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">Delivery Address</h4>
                  <p className="text-muted-foreground font-medium leading-relaxed mt-1">
                    {order ? order.shippingAddr : 'Your shipping address has been securely saved.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="flex-1">
              <Button size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
                Continue Shopping
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 rounded-xl text-lg font-bold border-2 shrink-0">
              <Share2 className="w-5 h-5 mr-2" /> Share Order
            </Button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
