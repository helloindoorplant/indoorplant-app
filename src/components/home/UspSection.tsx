import { Sparkles, Leaf, ShieldCheck, Truck } from 'lucide-react';

export function UspSection() {
  const usps = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Matches",
      desc: "Find the perfect plant for your space instantly with our smart advisor."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Expert Care Guides",
      desc: "Never kill a plant again with our detailed, step-by-step instructions."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "12-Hour Return Policy",
      desc: "Returns allowed within 12 hours of delivery, only for damaged plants."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Pan-India Delivery",
      desc: "Safe, secure, and sustainable packaging delivered to your doorstep."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-border/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {usps.map((usp, i) => (
            <div key={i} className="flex flex-col group cursor-pointer">
              <div className="h-20 w-20 bg-[#F8FFF9] rounded-full flex items-center justify-center text-primary mb-6 shadow-inner border border-primary/10 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                {usp.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 tracking-tight text-stone-900 group-hover:text-primary transition-colors">{usp.title}</h4>
              <p className="text-stone-500 font-medium leading-relaxed">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
