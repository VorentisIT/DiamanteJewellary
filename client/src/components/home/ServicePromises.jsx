import React from 'react';
import { ShieldCheck, Truck, Gift, RefreshCw, Headset } from 'lucide-react';

export default function ServicePromises() {
  return (
    <section className="bg-[#F8F5EE] py-10 border-b border-[#DED8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          
          <div className="space-y-1.5 flex flex-col items-center">
            <ShieldCheck className="w-7 h-7 text-[#C49A5A] stroke-[1.2]" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#202522]">
              Hallmarked Gold
            </h4>
            <p className="text-[10px] text-[#77736B]">Certified purity</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <Truck className="w-7 h-7 text-[#C49A5A] stroke-[1.2]" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#202522]">
              Insured Delivery
            </h4>
            <p className="text-[10px] text-[#77736B]">Safe and secure</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <Gift className="w-7 h-7 text-[#C49A5A] stroke-[1.2]" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#202522]">
              Luxury Packaging
            </h4>
            <p className="text-[10px] text-[#77736B]">For memorable moments</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <RefreshCw className="w-7 h-7 text-[#C49A5A] stroke-[1.2]" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#202522]">
              Lifetime Exchange
            </h4>
            <p className="text-[10px] text-[#77736B]">Hassle-free</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center col-span-2 md:col-span-1">
            <Headset className="w-7 h-7 text-[#C49A5A] stroke-[1.2]" />
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#202522]">
              Dedicated Support
            </h4>
            <p className="text-[10px] text-[#77736B]">Here to help</p>
          </div>

        </div>
      </div>
    </section>
  );
}
