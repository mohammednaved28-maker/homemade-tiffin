'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I am visiting your website and would like to inquire about North & South Homemade Tiffin subscriptions.'
  )}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
      {/* Tooltip Label (Desktop only) */}
      <span className="hidden md:inline-block px-3 py-1.5 rounded-full text-xs font-extrabold bg-slate-900 text-white shadow-xl border border-slate-800 animate-in fade-in">
        💬 Chat for Tiffin Order
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 whatsapp-pulse pointer-events-none" />
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-white" />
      </a>
    </div>
  );
};
