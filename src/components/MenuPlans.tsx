'use client';

import React from 'react';
import { siteConfig, Plan } from '@/config/siteConfig';
import { Check, Sparkles, ShoppingBag, Utensils, ArrowRight } from 'lucide-react';

interface MenuPlansProps {
  onSelectPlan?: (planId: 'veg' | 'veg-nonveg') => void;
}

export const MenuPlans: React.FC<MenuPlansProps> = ({ onSelectPlan }) => {

  const handleChoosePlan = (planId: 'veg' | 'veg-nonveg') => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
    const orderSection = document.getElementById('order-form');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu-plans" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Simple Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-theme-main mt-3">
            Choose Your Monthly Tiffin Subscription
          </h2>
          <p className="text-base text-theme-muted mt-2">
            30 delicious, hygienic meals delivered hot to your doorstep. Free delivery & customization included!
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {siteConfig.plans.map((plan: Plan) => (
            <div
              key={plan.id}
              className={`relative card-theme p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'border-2 border-[var(--brand-secondary)] shadow-2xl scale-[1.02] bg-gradient-to-b from-theme-card to-[var(--brand-secondary)]/5'
                  : 'hover:border-[var(--brand-primary)]'
              }`}
            >
              
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 right-6 bg-[var(--brand-secondary)] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl font-bold ${plan.id === 'veg' ? 'bg-emerald-500/15 text-emerald-700' : 'bg-amber-500/15 text-amber-700'}`}>
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-theme-main">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-bold text-theme-muted">
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="my-6 p-4 rounded-2xl bg-theme-secondary/50 border border-theme/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-4xl font-black text-[var(--brand-primary)]">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-theme-muted ml-1">
                      / {plan.tiffinsCount} tiffins
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                    ₹{Math.round(plan.price / plan.tiffinsCount)} / meal
                  </span>
                </div>

                <p className="text-sm text-theme-muted mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Non-Veg Highlight Box */}
                {plan.nonVegNote && (
                  <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{plan.nonVegNote}</span>
                  </div>
                )}

                {/* Items Included List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-black uppercase tracking-wider text-theme-muted mb-2">
                    Included in Box:
                  </div>
                  {plan.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm font-semibold text-theme-main">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={() => handleChoosePlan(plan.id)}
                className={`w-full py-4 px-6 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition-all ${
                  plan.isPopular ? 'btn-brand-secondary' : 'btn-brand-primary'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Subscribe / Order This Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

        {/* Custom Ordering Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-theme-secondary/60 border border-theme max-w-2xl mx-auto">
          <p className="text-sm font-bold text-theme-main">
            Need customized tiffin counts or office bulk orders?
          </p>
          <p className="text-xs text-theme-muted mt-1">
            Call or WhatsApp us directly at <a href={`tel:${siteConfig.contact.phonePrimary}`} className="underline font-bold text-[var(--brand-primary)]">{siteConfig.contact.phoneDisplay}</a> for party catering & special diet requests!
          </p>
        </div>

      </div>
    </section>
  );
};
