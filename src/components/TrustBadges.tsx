'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { UtensilsCrossed, CalendarDays, ShieldCheck, Sliders, Truck, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-7 h-7 text-[var(--brand-primary)]" />,
  CalendarDays: <CalendarDays className="w-7 h-7 text-[var(--brand-secondary)]" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
  Sliders: <Sliders className="w-7 h-7 text-indigo-600" />,
  Truck: <Truck className="w-7 h-7 text-amber-600" />,
};

export const TrustBadges: React.FC = () => {
  return (
    <section id="trust-badges" className="py-12 bg-theme-secondary/40 border-y border-theme relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-main mt-2">
            The Homemade Tiffin Standard
          </h2>
          <p className="text-sm text-theme-muted mt-1">
            We prioritize your health, taste preferences, and daily convenience.
          </p>
        </div>

        {/* 5 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {siteConfig.trustBadges.map((badge) => (
            <div
              key={badge.id}
              className="card-theme p-6 text-center flex flex-col items-center justify-between group hover:border-[var(--brand-secondary)] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-theme-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                {iconMap[badge.iconName] || <CheckCircle2 className="w-7 h-7 text-[var(--brand-primary)]" />}
              </div>
              <h3 className="text-base font-extrabold text-theme-main mb-2">
                {badge.title}
              </h3>
              <p className="text-xs text-theme-muted leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
