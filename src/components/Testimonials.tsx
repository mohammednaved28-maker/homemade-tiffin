'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative bg-theme-secondary/30 border-t border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Loved By 500+ Subscribers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-theme-main mt-3">
            What Our Customers Say
          </h2>
          <p className="text-sm text-theme-muted mt-1">
            Real feedback from office professionals, students & families enjoying our daily tiffins.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.testimonials.map((review) => (
            <div
              key={review.id}
              className="card-theme p-6 sm:p-8 flex flex-col justify-between relative group hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-[var(--brand-secondary)]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-theme-main leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Customer Avatar & Bio */}
              <div className="pt-4 border-t border-theme/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[var(--brand-secondary)]"
                  />
                  <div>
                    <div className="font-extrabold text-sm text-theme-main flex items-center gap-1">
                      <span>{review.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <div className="text-[11px] text-theme-muted">
                      {review.role} • {review.location}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-theme-secondary text-[var(--brand-primary)]">
                  {review.favoritePlan}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
