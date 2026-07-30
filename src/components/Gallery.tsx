'use client';

import React, { useState } from 'react';
import { siteConfig, GalleryItem } from '@/config/siteConfig';
import { Sparkles, Maximize2, X, ChefHat } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'veg' | 'nonveg' | 'thali'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'veg', label: 'Pure Veg Specials' },
    { id: 'nonveg', label: 'Non-Veg Specials' },
    { id: 'thali', label: 'Combo Thalis' },
  ];

  const filteredItems = activeCategory === 'all'
    ? siteConfig.gallery
    : siteConfig.gallery.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <ChefHat className="w-3.5 h-3.5" />
            Fresh From Our Kitchen
          </span>
          <h2 className="text-3xl font-black text-theme-main mt-3">
            Our Food Showcase
          </h2>
          <p className="text-sm text-theme-muted mt-1">
            Real photos of daily meals prepared fresh every morning with love & pure ingredients.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-full transition-all ${
                activeCategory === cat.id
                  ? 'btn-brand-primary shadow-md'
                  : 'bg-theme-card text-theme-main border border-theme hover:bg-theme-secondary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative card-theme overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[var(--brand-secondary)] text-white">
                      {item.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/80 group-hover:scale-125 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-theme-card rounded-3xl overflow-hidden border border-theme shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[80vh] overflow-y-auto">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[480px] object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary)] mb-2">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl font-black text-theme-main">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-theme-muted mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="mt-6 pt-4 border-t border-theme flex justify-end">
                  <a
                    href="#order-form"
                    onClick={() => setSelectedItem(null)}
                    className="btn-brand-primary px-6 py-2.5 text-xs font-bold"
                  >
                    Order Tiffin Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
