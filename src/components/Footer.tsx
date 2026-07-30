'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Phone, MessageSquare, MapPin, CookingPot, Home, Heart, Share2, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#1C100A] text-[#F3E5D8] pt-16 pb-12 border-t border-[#3A2218]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3A2218]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg">
                <Home className="w-5 h-5 absolute text-white/30" />
                <CookingPot className="w-5 h-5 relative z-10 text-white" />
              </div>
              <div>
                <span className="block font-black text-lg text-white">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                  {siteConfig.serviceTitle}
                </span>
              </div>
            </a>

            <p className="text-xs text-[#D4C3B5] leading-relaxed">
              &ldquo;{siteConfig.taglinePrimary}&rdquo; — {siteConfig.taglineSecondary}. 
              Dedicated to serving 100% pure, hygienic, homestyle North & South Indian meals with separate kitchens for veg.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${siteConfig.contact.phonePrimary}`}
                className="p-2.5 rounded-xl bg-[#291710] border border-[#3A2218] text-emerald-400 hover:text-emerald-300 transition-colors"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#291710] border border-[#3A2218] text-emerald-400 hover:text-emerald-300 transition-colors"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#291710] border border-[#3A2218] text-pink-400 hover:text-pink-300 transition-colors"
                title="Social Media"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#291710] border border-[#3A2218] text-blue-400 hover:text-blue-300 transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-[#F4A261]">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs font-medium text-[#D4C3B5]">
              <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#menu-plans" className="hover:text-orange-400 transition-colors">Veg Plan (₹3200)</a></li>
              <li><a href="#menu-plans" className="hover:text-orange-400 transition-colors">Veg & Non-Veg (₹3500)</a></li>
              <li><a href="#perfect-for" className="hover:text-orange-400 transition-colors">Party Catering</a></li>
              <li><a href="#gallery" className="hover:text-orange-400 transition-colors">Food Gallery</a></li>
              <li><a href="#order-form" className="hover:text-orange-400 transition-colors">Subscription Form</a></li>
            </ul>
          </div>

          {/* Contact Numbers */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-[#F4A261]">
              Direct Contact & Payment
            </div>
            <div className="space-y-2.5 text-xs text-[#F3E5D8]">
              <div className="p-3 rounded-xl bg-[#271710] border border-[#3A2218]">
                <div className="text-[10px] text-[#C4B2A3] font-bold uppercase">Call / WhatsApp Order Desk</div>
                <a href={`tel:${siteConfig.contact.phonePrimary}`} className="text-sm font-extrabold text-emerald-400 hover:underline">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#271710] border border-[#3A2218]">
                <div className="text-[10px] text-[#C4B2A3] font-bold uppercase">Payment Number (GPay/PhonePe/Paytm)</div>
                <div className="text-sm font-extrabold text-orange-400">
                  {siteConfig.contact.paymentPhoneDisplay}
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-[#F4A261] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Service Areas Covered
            </div>
            <div className="flex flex-wrap gap-1.5">
              {siteConfig.contact.serviceAreas.map((area) => (
                <span key={area} className="px-2.5 py-1 rounded-lg bg-[#271710] border border-[#3A2218] text-[11px] font-semibold text-[#E6D4C5]">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-[#C4B2A3] pt-1">
              Free home & office tiffin delivery across all major IT hubs & residential colonies.
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C4B2A3]">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic home-cooked food lovers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
