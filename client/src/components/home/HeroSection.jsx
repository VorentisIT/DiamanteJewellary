import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Gift } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#F8F5EE] overflow-hidden border-b border-[#DED8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column Content (45%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-5 text-left"
          >
            <div className="text-[10px] font-semibold tracking-[0.3em] text-[#C49A5A] uppercase font-sans">
              TIMELESS ELEGANCE
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-normal leading-[1.12] text-[#202522] tracking-tight">
              Jewellery Made to <br />
              <span className="italic font-serif font-light text-[#B58E53]">Become</span> Part of <br />
              Your Story.
            </h1>

            <p className="text-xs sm:text-sm text-[#77736B] max-w-md leading-relaxed font-sans font-light">
              Exquisite craft. Meaningful designs. For every milestone, and every moment in-between.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/jewellery"
                className="bg-[#B58E53] text-white text-[11px] font-semibold uppercase tracking-widest px-7 py-3.5 hover:bg-[#9E7B44] transition-colors flex items-center justify-center gap-2 group shadow-sm"
              >
                SHOP THE COLLECTION <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/jewellery?newArrival=true"
                className="bg-transparent border border-[#202522] text-[#202522] text-[11px] font-semibold uppercase tracking-widest px-6 py-3.5 hover:border-[#C49A5A] hover:text-[#C49A5A] transition-colors text-center"
              >
                EXPLORE NEW ARRIVALS
              </Link>
            </div>

            {/* 4 Service Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-[#77736B]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0" />
                <span>Certified Hallmarked Gold</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0" />
                <span>Secure Insured Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0" />
                <span>Lifetime Exchange</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0" />
                <span>Luxury Gift Packaging</span>
              </div>
            </div>

            {/* Pagination numbers indicator */}
            <div className="pt-4 flex items-center gap-4 text-xs text-[#77736B] font-serif tracking-widest">
              <span className="text-[#202522] font-bold border-b border-[#C49A5A] pb-0.5">01</span>
              <span>—</span>
              <span>02</span>
              <span>—</span>
              <span>03</span>
            </div>
          </motion.div>

          {/* Right Column Campaign Image (55%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            <div className="w-full relative overflow-hidden rounded-sm">
              <img
                src="/assets/hero_lifestyle.jpg"
                alt="Luxury Jewellery Model"
                className="w-full h-[460px] sm:h-[580px] object-cover"
              />

              {/* Top Right Script Watermark */}
              <div className="absolute right-6 top-8 text-right font-serif italic text-white/90 drop-shadow-md select-none leading-tight">
                <span className="block text-sm sm:text-base tracking-widest font-light">More Than</span>
                <span className="block text-base sm:text-lg tracking-widest font-normal text-[#D9BC86]">Jewellery</span>
                <span className="block text-sm sm:text-base tracking-widest font-light">A Feeling</span>
              </div>

              {/* Bottom Right Controls */}
              <div className="absolute right-4 bottom-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white px-3 py-1 text-xs rounded border border-white/20">
                <button className="hover:text-[#C49A5A] p-1">‹</button>
                <span className="text-white/40">|</span>
                <button className="hover:text-[#C49A5A] p-1">›</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
