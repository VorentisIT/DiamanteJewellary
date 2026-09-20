import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="bg-[#F8F5EE] py-14 lg:py-20 border-b border-[#DED8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-semibold tracking-[0.28em] text-[#C49A5A] uppercase block font-sans">
              HERITAGE & CRAFTSMANSHIP
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#202522] font-normal leading-tight">
              Crafted With Intention. <br />Worn With Meaning.
            </h2>

            <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed font-light max-w-md">
              Every piece is a blend of traditional artistry and modern design, created with the finest materials and an uncompromising eye for detail.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#202522] border-b border-[#202522] pb-0.5 hover:border-[#C49A5A] hover:text-[#C49A5A] transition-colors"
              >
                OUR CRAFTSMANSHIP <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Image Panels */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3.5">
            
            {/* Panel 1 */}
            <div className="space-y-2 text-left">
              <div className="aspect-[3/4] bg-[#F4EFEA] border border-[#DED8CC] overflow-hidden image-zoom-container rounded-sm">
                <img
                  src="/assets/craftsmanship.jpg"
                  alt="Skilled Artisan Crafting Ring"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block font-serif">
                  Skilled Artisans
                </span>
                <span className="text-[10px] text-[#77736B] block">Generations of expertise</span>
              </div>
            </div>

            {/* Panel 2 */}
            <div className="space-y-2 text-left">
              <div className="aspect-[3/4] bg-[#F4EFEA] border border-[#DED8CC] overflow-hidden image-zoom-container rounded-sm">
                <img
                  src="/assets/category_rings.jpg"
                  alt="Premium Materials Ring"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block font-serif">
                  Premium Materials
                </span>
                <span className="text-[10px] text-[#77736B] block">Ethically sourced</span>
              </div>
            </div>

            {/* Panel 3 */}
            <div className="space-y-2 text-left">
              <div className="aspect-[3/4] bg-[#F4EFEA] border border-[#DED8CC] overflow-hidden image-zoom-container rounded-sm">
                <img
                  src="/assets/sketch_design.jpg"
                  alt="Timeless Designs Sketch"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block font-serif">
                  Timeless Designs
                </span>
                <span className="text-[10px] text-[#77736B] block">Classics for tomorrow</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
