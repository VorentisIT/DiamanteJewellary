import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#102C24] text-[#F8F5EE] text-[11px] font-sans py-2 px-4 border-b border-[#0A1D18] overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-wide whitespace-nowrap overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[#C49A5A]">✦</span>
          <span>50,000+ Happy Clients</span>
          <span className="text-[#C49A5A]/50">•</span>
          <span>Certified Jewellery</span>
          <span className="text-[#C49A5A]/50">•</span>
          <span>Lifetime Exchange</span>
          <span className="text-[#C49A5A]/50">•</span>
          <span className="font-medium text-[#C49A5A]">Free Express Insured Shipping Above ₹25,000</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#F8F5EE]/80 flex-shrink-0 ml-4">
          <Link to="/about" className="hover:text-[#C49A5A] transition-colors">Boutiques</Link>
          <span>|</span>
          <Link to="/account" className="hover:text-[#C49A5A] transition-colors">Track Order</Link>
          <span>|</span>
          <Link to="/about" className="hover:text-[#C49A5A] transition-colors">Concierge</Link>
        </div>
      </div>
    </div>
  );
}

