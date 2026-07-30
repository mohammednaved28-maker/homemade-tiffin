'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { OrderDetails } from './PaymentSuccessModal';
import { ShieldCheck, Copy, Check, MessageSquare, X, Smartphone } from 'lucide-react';

interface PaymentSectionProps {
  manualUPIOrder?: OrderDetails | null;
  onCloseManualUPI?: () => void;
  onConfirmManualUPIPaid?: (details: OrderDetails) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  manualUPIOrder,
  onCloseManualUPI,
  onConfirmManualUPIPaid,
}) => {
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(siteConfig.contact.paymentPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentOrder = manualUPIOrder || {
    customerName: 'Valued Subscriber',
    customerPhone: '',
    address: '',
    planId: 'veg',
    planName: 'Veg Tiffin Box',
    startDate: 'Tomorrow',
    tiffinsCount: 30,
    totalAmount: 3200,
    paymentMethod: 'manual-upi',
  };

  // Generate UPI QR Code URL using free QR server endpoint for 9553529093@paytm or upi://pay
  const upiString = `upi://pay?pa=${siteConfig.contact.paymentPhone}@paytm&pn=NorthSouthTiffin&am=${currentOrder.totalAmount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;

  return (
    <section id="payment-section" className="py-16 md:py-24 relative border-t border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Secure Payment Options
          </span>
          <h2 className="text-3xl font-black text-theme-main mt-3">
            Direct UPI & Payment Details
          </h2>
          <p className="text-sm text-theme-muted mt-1">
            Pay securely online or transfer directly to our official business UPI number.
          </p>
        </div>

        {/* Manual UPI Box */}
        <div className="max-w-2xl mx-auto card-theme p-6 sm:p-8 text-center border-2 border-[var(--brand-secondary)]/30">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-theme-main">
            Direct UPI & QR Code Payment Option
          </h3>
          <p className="text-xs text-theme-muted mt-1 max-w-md mx-auto">
            You can pay directly by scanning our QR code or transferring to our official registered payment number:
          </p>

          <div className="my-6 p-4 rounded-2xl bg-theme-secondary flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-[10px] font-bold text-theme-muted uppercase">Official Payment Phone / UPI</div>
              <div className="text-xl sm:text-2xl font-black text-[var(--brand-primary)]">
                {siteConfig.contact.paymentPhoneDisplay}
              </div>
            </div>

            <button
              onClick={copyUPI}
              className="px-4 py-2 text-xs font-extrabold rounded-xl bg-theme-card border border-theme text-theme-main hover:bg-[var(--brand-primary)] hover:text-white flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Number!' : 'Copy Number'}</span>
            </button>
          </div>

          <p className="text-xs font-semibold text-theme-muted">
            After paying via GPay / PhonePe / Paytm, please send the payment screenshot on WhatsApp to confirm your delivery slot instantly.
          </p>
        </div>

      </div>

      {/* Manual UPI Modal Popup (Triggers when user selects Manual UPI in Order Form) */}
      {manualUPIOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-theme-card rounded-3xl overflow-hidden border border-theme shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-center">
            
            {onCloseManualUPI && (
              <button
                onClick={onCloseManualUPI}
                className="absolute top-4 right-4 p-2 rounded-full bg-theme-secondary hover:bg-theme-muted/20 text-theme-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 text-amber-800">
              Scan & Pay via UPI
            </span>

            <h3 className="text-2xl font-black text-theme-main mt-2">
              Pay ₹{manualUPIOrder.totalAmount}
            </h3>
            <p className="text-xs text-theme-muted mt-0.5">
              for {manualUPIOrder.planName} ({manualUPIOrder.tiffinsCount} Tiffins)
            </p>

            {/* QR Code Placeholder / Generated Image */}
            <div className="my-6 p-4 rounded-2xl bg-white border border-gray-200 inline-block shadow-inner">
              <img
                src={qrCodeUrl}
                alt="UPI Payment QR Code for 9553529093"
                className="w-48 h-48 mx-auto"
              />
              <div className="text-[11px] font-bold text-gray-700 mt-2">
                UPI ID: {siteConfig.contact.paymentPhone}@paytm
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={copyUPI}
                className="w-full py-2.5 px-4 text-xs font-extrabold rounded-xl border border-theme bg-theme-secondary text-theme-main flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>Copy UPI Number ({siteConfig.contact.paymentPhone})</span>
              </button>

              <button
                onClick={() => {
                  if (onConfirmManualUPIPaid) {
                    onConfirmManualUPIPaid(manualUPIOrder);
                  }
                }}
                className="w-full py-4 px-6 font-extrabold text-sm btn-brand-secondary flex items-center justify-center gap-2 shadow-xl rounded-2xl"
              >
                <MessageSquare className="w-5 h-5" />
                <span>I Have Paid — Send Screenshot on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
