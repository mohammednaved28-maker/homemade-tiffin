'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { siteConfig } from '@/config/siteConfig';
import { CheckCircle2, MessageSquare, X, Calendar, MapPin, Phone, User, Package, ShieldCheck, Hash } from 'lucide-react';

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  address: string;
  planId: 'veg' | 'veg-nonveg';
  planName: string;
  startDate: string;
  tiffinsCount: number;
  totalAmount: number;
  instructions?: string;
  paymentMethod: 'razorpay' | 'manual-upi';
  paymentId?: string;
  utrNumber?: string;
}

interface PaymentSuccessModalProps {
  orderDetails: OrderDetails;
  onClose: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ orderDetails, onClose }) => {
  
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const orderId = orderDetails.paymentId || 'HT12345';
  const formattedAmount = orderDetails.totalAmount.toLocaleString('en-IN');
  const utrText = orderDetails.utrNumber ? ` UTR No: ${orderDetails.utrNumber}.` : '';
  
  const whatsappMessage = `Hi, I have paid ₹${formattedAmount}. My Order ID: ${orderId}.${utrText} Please verify my payment.`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-theme-card rounded-3xl overflow-hidden border border-theme shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-theme-secondary hover:bg-theme-muted/20 text-theme-main transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Order Logged — Pending Admin Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-main mt-2.5">
            Thank You, {orderDetails.customerName}!
          </h2>
          <p className="text-xs text-theme-muted mt-1">
            Order ID: <strong className="text-theme-main font-mono">{orderId}</strong>
          </p>
        </div>

        {/* Order Details Summary Box */}
        <div className="my-5 p-4 rounded-2xl bg-theme-secondary/60 border border-theme space-y-2 text-xs text-theme-main">
          <div className="flex items-center justify-between border-b border-theme/60 pb-2">
            <span className="flex items-center gap-1.5 font-semibold text-theme-muted">
              <Package className="w-4 h-4 text-[var(--brand-primary)]" /> Selected Plan
            </span>
            <span className="font-bold text-[var(--brand-primary)]">{orderDetails.planName}</span>
          </div>

          {orderDetails.utrNumber && (
            <div className="flex items-center justify-between border-b border-theme/60 pb-2">
              <span className="flex items-center gap-1.5 font-semibold text-theme-muted">
                <Hash className="w-4 h-4 text-[var(--brand-primary)]" /> 12-Digit UTR Ref
              </span>
              <span className="font-mono font-black text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">{orderDetails.utrNumber}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-theme/60 pb-2">
            <span className="flex items-center gap-1.5 font-semibold text-theme-muted">
              <User className="w-4 h-4 text-[var(--brand-primary)]" /> Phone
            </span>
            <span className="font-bold">{orderDetails.customerPhone}</span>
          </div>

          <div className="flex items-center justify-between border-b border-theme/60 pb-2">
            <span className="flex items-center gap-1.5 font-semibold text-theme-muted">
              <Calendar className="w-4 h-4 text-[var(--brand-primary)]" /> Start Date
            </span>
            <span className="font-bold">{orderDetails.startDate} ({orderDetails.tiffinsCount} Days)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold text-theme-muted">
              <MapPin className="w-4 h-4 text-[var(--brand-primary)]" /> Amount Paid
            </span>
            <span className="font-black text-base text-[var(--brand-secondary)]">₹{formattedAmount}</span>
          </div>
        </div>

        <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-900 leading-relaxed font-medium">
          💡 Please attach your UPI payment screenshot in WhatsApp so our kitchen team can verify your payment statement and activate your daily tiffin dispatch!
        </div>

        {/* WhatsApp Send Confirmation CTA */}
        <div className="space-y-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 font-extrabold text-xs sm:text-sm btn-brand-secondary flex items-center justify-center gap-2 shadow-xl rounded-2xl"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Attach Screenshot & Send on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 font-bold text-xs text-theme-muted hover:text-theme-main text-center"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
