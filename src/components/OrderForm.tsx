'use client';

import React, { useState, useRef } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { OrderDetails } from './PaymentSuccessModal';
import { saveClientOrder } from '@/lib/clientStore';
import { ShoppingBag, User, Phone, MapPin, Calendar, Sliders, AlertCircle, QrCode, MessageSquare } from 'lucide-react';

interface OrderFormProps {
  selectedPlanId?: 'veg' | 'veg-nonveg';
  onOrderComplete: (details: OrderDetails) => void;
  onOpenManualUPI: (details: OrderDetails) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  selectedPlanId = 'veg',
  onOrderComplete,
  onOpenManualUPI,
}) => {
  const [planId, setPlanId] = useState<'veg' | 'veg-nonveg'>(selectedPlanId);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [tiffinsCount, setTiffinsCount] = useState(30);
  const [instructions, setInstructions] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const formCardRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedPlanId) {
      setPlanId(selectedPlanId);
    }
  }, [selectedPlanId]);

  const selectedPlanObj = siteConfig.plans.find((p) => p.id === planId) || siteConfig.plans[0];
  const calculatedTotal = Math.round((selectedPlanObj.price / 30) * tiffinsCount);

  const validateForm = () => {
    setErrorMsg('');
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your complete delivery address.');
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (!startDate) {
      setErrorMsg('Please select a start date for your tiffin delivery.');
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const saveOrderToBackend = (orderPayload: OrderDetails) => {
    const orderId = orderPayload.paymentId || `HT${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Instant client store & event broadcast for real-time dashboard update
    saveClientOrder({
      id: orderId,
      customerName: orderPayload.customerName,
      customerPhone: orderPayload.customerPhone,
      address: orderPayload.address,
      planId: orderPayload.planId,
      planName: orderPayload.planName,
      startDate: orderPayload.startDate,
      tiffinsCount: orderPayload.tiffinsCount,
      totalAmount: orderPayload.totalAmount,
      instructions: orderPayload.instructions,
      paymentMethod: 'manual-upi',
      paymentStatus: 'PENDING',
      orderStatus: 'NEW',
      paymentId: orderId,
    });

    // Cloud API persistence in background
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: orderPayload.customerName,
        customerPhone: orderPayload.customerPhone,
        address: orderPayload.address,
        planId: orderPayload.planId,
        planName: orderPayload.planName,
        startDate: orderPayload.startDate,
        tiffinsCount: orderPayload.tiffinsCount,
        totalAmount: orderPayload.totalAmount,
        instructions: orderPayload.instructions,
        paymentMethod: 'manual-upi',
        paymentStatus: 'PENDING',
        paymentId: orderId,
      }),
    }).catch((err) => console.error('Error persisting order to backend API:', err));
  };

  const handlePayViaUPIQR = (e: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    const orderId = `HT${Math.floor(10000 + Math.random() * 90000)}`;

    const orderPayload: OrderDetails = {
      customerName: name,
      customerPhone: phone,
      address: address,
      planId: planId,
      planName: selectedPlanObj.name,
      startDate: startDate,
      tiffinsCount: tiffinsCount,
      totalAmount: calculatedTotal,
      instructions: instructions,
      paymentMethod: 'manual-upi',
      paymentId: orderId,
    };

    // Save order asynchronously (non-blocking)
    saveOrderToBackend(orderPayload);

    // Open QR Code Modal INSTANTLY
    onOpenManualUPI(orderPayload);
  };

  return (
    <section id="order-form" className="py-12 sm:py-16 md:py-24 relative bg-theme-secondary/40 border-t border-theme">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" />
            Easy 1-Minute Order
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-theme-main mt-2.5">
            Start Your Tiffin Subscription
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted mt-1">
            Fill in your delivery details below for instant kitchen slot confirmation.
          </p>
        </div>

        {/* Card Form */}
        <div ref={formCardRef} className="card-theme p-4 sm:p-8 md:p-10 shadow-2xl relative">
          
          {errorMsg && (
            <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handlePayViaUPIQR} className="space-y-5 sm:space-y-6">
            
            {/* 1. Plan Selector */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-2.5">
                1. Select Tiffin Plan *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {siteConfig.plans.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPlanId(p.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between min-h-[64px] ${
                      planId === p.id
                        ? 'border-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 shadow-md'
                        : 'border-theme/70 bg-theme-card hover:border-theme'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-theme-main">{p.name}</div>
                      <div className="text-[11px] sm:text-xs font-bold text-[var(--brand-primary)] mt-0.5">
                        ₹{p.price} / 30 Tiffins
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${planId === p.id ? 'border-[var(--brand-secondary)] bg-[var(--brand-secondary)]' : 'border-gray-300'}`}>
                      {planId === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Customer Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Name */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3.5 text-theme-muted" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[48px] sm:min-h-[50px] pl-10 sm:pl-11 pr-4 py-3 text-xs sm:text-sm font-medium rounded-xl border border-theme bg-theme-card text-theme-main focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-1.5">
                  Mobile Number (Call & WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3.5 text-theme-muted" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[48px] sm:min-h-[50px] pl-10 sm:pl-11 pr-4 py-3 text-xs sm:text-sm font-medium rounded-xl border border-theme bg-theme-card text-theme-main focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* 3. Delivery Address */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-1.5">
                Complete Delivery Address & Flat/Office No. *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3.5 text-theme-muted" />
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Flat 302, Cyber Heights, Main Road, Hitech City, Hyderabad"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 sm:pl-11 pr-4 py-3 text-xs sm:text-sm font-medium rounded-xl border border-theme bg-theme-card text-theme-main focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none"
                />
              </div>
            </div>

            {/* 4. Dates & Tiffin Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Start Date */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-1.5">
                  Subscription Start Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3.5 text-theme-muted" />
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full min-h-[48px] sm:min-h-[50px] pl-10 sm:pl-11 pr-4 py-3 text-xs sm:text-sm font-medium rounded-xl border border-theme bg-theme-card text-theme-main focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Tiffin Stepper */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-1.5">
                  Number of Days / Tiffins
                </label>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTiffinsCount(Math.max(7, tiffinsCount - 1))}
                    className="w-12 h-12 rounded-xl border border-theme bg-theme-secondary font-bold text-lg text-theme-main hover:bg-theme-muted/20 active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center py-3 font-black text-base sm:text-lg bg-theme-card rounded-xl border border-theme">
                    {tiffinsCount} Days
                  </div>
                  <button
                    type="button"
                    onClick={() => setTiffinsCount(tiffinsCount + 1)}
                    className="w-12 h-12 rounded-xl border border-theme bg-theme-secondary font-bold text-lg text-theme-main hover:bg-theme-muted/20 active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* 5. Special Instructions */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-theme-main mb-1.5">
                Special Customisation Instructions (Optional)
              </label>
              <div className="relative">
                <Sliders className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3.5 text-theme-muted" />
                <input
                  type="text"
                  placeholder="e.g. Less oil in sabji, no garlic, delivery around 1:00 PM"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full min-h-[48px] sm:min-h-[50px] pl-10 sm:pl-11 pr-4 py-3 text-xs sm:text-sm font-medium rounded-xl border border-theme bg-theme-card text-theme-main focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none"
                />
              </div>
            </div>

            {/* Total Price Bar & Single Prominent QR Payment Button */}
            <div className="pt-4 border-t border-theme">
              
              <div className="flex items-center justify-between mb-5 p-3.5 sm:p-4 rounded-2xl bg-theme-secondary/80 border border-theme">
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-theme-muted uppercase">Calculated Total</div>
                  <div className="text-[10px] sm:text-xs text-theme-muted">{tiffinsCount} Tiffin Deliveries</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--brand-primary)]">
                    ₹{calculatedTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-emerald-600">Free Doorstep Delivery</div>
                </div>
              </div>

              {/* Single Primary QR Code Payment Button with explicit Touch Event support for Mobile Browsers */}
              <button
                type="button"
                onClick={handlePayViaUPIQR}
                onTouchEnd={(e) => {
                  // Ensure touch tap triggers on mobile Safari / Chrome
                  if (!name || !phone || !address) {
                    validateForm();
                  }
                }}
                className="w-full min-h-[56px] sm:min-h-[60px] py-4 px-5 font-extrabold text-xs sm:text-base btn-brand-secondary flex items-center justify-center gap-2.5 shadow-2xl active:scale-95 transition-transform rounded-2xl cursor-pointer"
              >
                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Pay via Official UPI QR Code (GPay / PhonePe / Paytm)</span>
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
