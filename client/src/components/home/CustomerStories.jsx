import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function CustomerStories() {
  return (
    <section className="bg-ivory py-16 lg:py-20 border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase block mb-1">
              KIND WORDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              What Our Customers Say
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Testimonial Card */}
          <div className="lg:col-span-5 bg-ivory-paper border border-warm-border p-8 shadow-sm space-y-4 relative">
            <Quote className="w-8 h-8 text-gold/40 stroke-[1]" />
            <p className="font-serif text-lg text-charcoal italic leading-relaxed">
              "Every detail felt thoughtful, from the packaging to the piece itself. Aurélia has become my go-to for meaningful jewellery."
            </p>
            
            <div className="pt-2 border-t border-warm-border flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-charcoal block">Priya S.</span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 fill-emerald-700 text-white" /> Verified Purchase
                </span>
              </div>
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Customer Photo Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="aspect-square bg-ivory-paper border border-warm-border overflow-hidden image-zoom-container">
              <img src="/assets/category_rings.jpg" alt="Customer Solitaire Ring" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-ivory-paper border border-warm-border overflow-hidden image-zoom-container">
              <img src="/assets/category_necklaces.jpg" alt="Customer Gold Necklace" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-ivory-paper border border-warm-border overflow-hidden image-zoom-container">
              <img src="/assets/packaging_box.jpg" alt="Aurélia Luxury Packaging" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-ivory-paper border border-warm-border overflow-hidden image-zoom-container">
              <img src="/assets/category_bracelets.jpg" alt="Customer Diamond Bracelet" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
