import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PhilosophySection() {
  return (
    <section className="bg-ivory-paper py-16 border-b border-warm-border">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-[10px] font-semibold tracking-[0.3em] text-gold uppercase block">
          OUR PHILOSOPHY
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
          Designed for the moments that deserve to be remembered.
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto leading-relaxed font-light">
          At AURÉLIA, we create more than fine jewellery. We craft timeless heirlooms that celebrate love, strength, and every chapter of your unique story.
        </p>
        <div className="pt-2">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-charcoal hover:text-gold transition-colors border-b border-gold pb-1"
          >
            Discover Our Story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
