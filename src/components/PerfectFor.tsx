'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Cake, Users, Briefcase, HeartHandshake, Sparkles, ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cake: <Cake className="w-6 h-6 text-pink-600" />,
  Users: <Users className="w-6 h-6 text-indigo-600" />,
  Briefcase: <Briefcase className="w-6 h-6 text-amber-600" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
};

export const PerfectFor: React.FC = () => {
  return (
    <section id="perfect-for" className="py-16 bg-theme-secondary/30 border-y border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Catering & Bulk Orders
          </span>
          <h2 className="text-3xl font-black text-theme-main mt-3">
            Perfect For Special Occasions
          </h2>
          <p className="text-sm text-theme-muted mt-1">
            Not just daily subscriptions — we cater fresh homemade spreads for all your celebrations!
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="card-theme overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                    {iconMap[useCase.iconName] || <Cake className="w-6 h-6 text-[var(--brand-primary)]" />}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-theme-main mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-xs text-theme-muted leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi!%20I%20want%20to%20inquire%20about%20catering%20for%20a%20${encodeURIComponent(useCase.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-extrabold rounded-xl border border-theme bg-theme-secondary hover:bg-[var(--brand-primary)] hover:text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Book Event Bulk Order</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
