'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Sparkles, ShoppingBag, MessageSquare, ShieldCheck, Utensils, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-4 pb-12 sm:pt-14 sm:pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 overflow-hidden w-full max-w-full">
      
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-0 right-0 -mr-28 -mt-28 w-64 h-64 sm:w-[500px] sm:h-[500px] rounded-full bg-[var(--brand-secondary)]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-28 -mb-28 w-64 h-64 sm:w-[500px] sm:h-[500px] rounded-full bg-[var(--brand-primary)]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 xl:gap-16 items-center w-full">
          
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left max-w-full overflow-hidden">
            
            {/* Pill Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 max-w-full">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold bg-amber-500/15 text-amber-900 border border-amber-500/30 shadow-sm max-w-full">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                <span>100% Pure & Hygienic Food</span>
              </span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold bg-emerald-500/15 text-emerald-900 border border-emerald-500/30 max-w-full">
                <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span>Separate Kitchen for Veg</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5 sm:space-y-3 max-w-full">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight text-theme-main leading-tight break-words max-w-full">
                {siteConfig.brandName} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-primary-hover)] to-[var(--brand-secondary)] inline-block max-w-full">
                  {siteConfig.taglinePrimary}
                </span>
              </h1>
              <p className="text-sm sm:text-xl xl:text-2xl font-extrabold text-[var(--brand-secondary)] tracking-wide break-words max-w-full px-1">
                &ldquo;{siteConfig.taglineSecondary}&rdquo;
              </p>
            </div>

            {/* Paragraph Description */}
            <p className="text-xs sm:text-base md:text-lg xl:text-xl text-theme-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed break-words px-1">
              Wholesome, hot & authentic North & South Indian meals cooked fresh every single day. 
              Zero artificial preservatives, minimal oil, strict hygiene standards, and free home delivery directly to your door!
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 max-w-full">
              <a
                href="#menu-plans"
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[54px] xl:min-h-[60px] px-4 sm:px-8 xl:px-10 py-3 sm:py-4 text-xs sm:text-base xl:text-lg font-extrabold btn-brand-primary flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all max-w-full"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 flex-shrink-0" />
                <span className="truncate">Order Now — See Plans</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi!%20I%20want%20to%20subscribe%20to%20Home%20Made%20Tiffin.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[54px] xl:min-h-[60px] px-4 sm:px-8 xl:px-10 py-3 sm:py-4 text-xs sm:text-base xl:text-lg font-extrabold btn-brand-secondary flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all max-w-full"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 flex-shrink-0" />
                <span className="truncate">Chat on WhatsApp</span>
              </a>
            </div>

            {/* Desktop & Mobile Highlights Bar */}
            <div className="pt-4 sm:pt-6 border-t border-theme/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-md sm:max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-2xl xl:text-3xl font-black text-[var(--brand-primary)]">₹3200</div>
                <div className="text-[10px] sm:text-xs font-bold text-theme-muted">30 Tiffins Veg</div>
              </div>
              <div className="text-center lg:text-left border-x border-theme/60 px-1 sm:px-3">
                <div className="text-lg sm:text-2xl xl:text-3xl font-black text-[var(--brand-secondary)]">2 Days</div>
                <div className="text-[10px] sm:text-xs font-bold text-theme-muted">Non-Veg / Wk</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-2xl xl:text-3xl font-black text-emerald-600">FREE</div>
                <div className="text-[10px] sm:text-xs font-bold text-theme-muted">Door Delivery</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative max-w-full">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/80 bg-theme-card group">
              <img
                src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1000&q=80"
                alt="Home Made Tiffin Thali Spread"
                className="w-full h-[280px] sm:h-[420px] lg:h-[480px] xl:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 sm:p-6 xl:p-8 text-white">
                <span className="self-start px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-black bg-amber-500 text-black uppercase tracking-wider mb-1">
                  Daily Special Thali
                </span>
                <h3 className="text-base sm:text-2xl xl:text-3xl font-bold text-white leading-tight">
                  Home Made Tiffin Spread
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-200 mt-0.5 leading-tight">
                  Paneer Curry, Dal Tadka, Basmati Rice, Hot Chapati, Salad & Fresh Curd
                </p>
              </div>
            </div>

            {/* Overlay Badges Positioned Inside Screen Bounds */}
            <div className="absolute top-2 left-2 sm:-top-6 sm:-left-6 bg-theme-card p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-theme flex items-center gap-2 sm:gap-3 max-w-[150px] sm:max-w-[210px] xl:max-w-[240px]">
              <div className="w-7 h-7 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-lg sm:rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                <Utensils className="w-3.5 h-3.5 sm:w-5 sm:h-5 xl:w-6 xl:h-6" />
              </div>
              <div>
                <div className="text-[10px] sm:text-sm xl:text-base font-extrabold text-theme-main leading-tight">100% Pure Veg</div>
                <div className="text-[8px] sm:text-xs text-theme-muted">Dedicated Kitchen</div>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 bg-theme-card p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-theme flex items-center gap-2 sm:gap-3 max-w-[150px] sm:max-w-[220px] xl:max-w-[250px]">
              <div className="w-7 h-7 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-lg sm:rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
                <Award className="w-3.5 h-3.5 sm:w-5 sm:h-5 xl:w-6 xl:h-6" />
              </div>
              <div>
                <div className="text-[10px] sm:text-sm xl:text-base font-extrabold text-theme-main leading-tight">5.0 ★ Rated</div>
                <div className="text-[8px] sm:text-xs text-theme-muted">500+ Subscribers</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
