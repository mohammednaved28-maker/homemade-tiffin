'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Phone, MessageSquare, Menu, X, CookingPot, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Highlights', href: '#trust-badges' },
    { name: 'Plans', href: '#menu-plans' },
    { name: 'Occasions', href: '#perfect-for' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Subscribe', href: '#order-form' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-[60] nav-glass transition-all duration-300 w-full max-w-full">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 relative z-50">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">
          
          {/* Left: Brand Logo & Title */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink min-w-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-md flex-shrink-0">
              <Home className="w-4 h-4 sm:w-6 sm:h-6 absolute text-white/30" />
              <CookingPot className="w-4 h-4 sm:w-6 sm:h-6 relative z-10 text-white" />
            </div>
            <div className="min-w-0">
              <span className="block font-black text-xs sm:text-base lg:text-lg leading-tight tracking-tight text-theme-main truncate group-hover:text-[var(--brand-primary)] transition-colors">
                {siteConfig.brandName}
              </span>
              <span className="inline-block px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-xs font-extrabold rounded-full bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary)] uppercase tracking-wider truncate">
                {siteConfig.serviceTitle}
              </span>
            </div>
          </a>

          {/* Center/Right Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs xl:text-sm font-extrabold text-theme-main/80 hover:text-[var(--brand-primary)] transition-colors relative py-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--brand-secondary)] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Group: Call & WhatsApp CTAs + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 relative z-50 ml-auto">
            
            {/* Call Now CTA */}
            <a
              href={`tel:${siteConfig.contact.phonePrimary}`}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-extrabold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md"
              title="Call for Tiffin Order"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi!%20I%20want%20to%20know%20more%20about%20Home%20Made%20Tiffin%20plans.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-full btn-brand-secondary shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-theme bg-theme-card text-theme-main focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-theme bg-theme-card/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200 relative z-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-extrabold text-theme-main hover:bg-theme-secondary rounded-xl transition-colors text-center border border-theme/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-theme grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.contact.phonePrimary}`}
              className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-600 text-white shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-extrabold rounded-xl btn-brand-secondary shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
