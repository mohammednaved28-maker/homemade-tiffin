'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { OrderDetails } from './PaymentSuccessModal';
import { saveClientOrder, updateClientOrderStatus } from '@/lib/clientStore';
import { Copy, Check, MessageSquare, X, QrCode, Hash, AlertCircle } from 'lucide-react';

interface ManualUPIModalProps {
  manualUPIOrder: OrderDetails;
  onClose: () => void;
  onConfirmPaid: (details: OrderDetails) => void;
}

export const ManualUPIModal: React.FC<ManualUPIModalProps> = ({
  manualUPIOrder,
  onClose,
  onConfirmPaid,
}) => {
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');

  const orderId = manualUPIOrder.paymentId || `HT${Math.floor(10000 + Math.random() * 90000)}`;

  const copyUPI = () => {
    navigator.clipboard.writeText(siteConfig.contact.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppPaidSubmit = () => {
    setUtrError('');

    const cleanUtr = utrNumber.replace(/\D/g, '');
    if (!cleanUtr || cleanUtr.length < 6) {
      setUtrError('Please enter your 12-digit UPI UTR / Ref Number from your GPay/PhonePe receipt.');
      return;
    }

    const formattedAmount = manualUPIOrder.totalAmount.toLocaleString('en-IN');
    const message = `Hi, I have paid ₹${formattedAmount}. My Order ID: ${orderId}. UTR No: ${cleanUtr}. Please verify my payment.`;
    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    const updatedOrder: OrderDetails = {
      ...manualUPIOrder,
      paymentId: orderId,
      utrNumber: cleanUtr,
    };

    // Save to client store & database
    saveClientOrder({
      id: orderId,
      customerName: manualUPIOrder.customerName,
      customerPhone: manualUPIOrder.customerPhone,
      address: manualUPIOrder.address,
      planId: manualUPIOrder.planId,
      planName: manualUPIOrder.planName,
      startDate: manualUPIOrder.startDate,
      tiffinsCount: manualUPIOrder.tiffinsCount,
      totalAmount: manualUPIOrder.totalAmount,
      instructions: manualUPIOrder.instructions,
      paymentMethod: 'manual-upi',
      paymentStatus: 'PENDING',
      orderStatus: 'NEW',
      paymentId: orderId,
      utrNumber: cleanUtr,
    });

    // Open WhatsApp pre-filled message in a new window
    window.open(whatsappUrl, '_blank');
    
    // Pass updated order details with UTR
    onConfirmPaid(updatedOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-theme-card rounded-3xl overflow-hidden border border-theme shadow-2xl p-5 sm:p-7 animate-in zoom-in-95 duration-200 text-center max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-theme-secondary hover:bg-theme-muted/20 text-theme-main transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-900 border border-amber-500/30 inline-flex items-center gap-1.5">
          <QrCode className="w-3.5 h-3.5 text-amber-600" />
          Official GPay / PhonePe UPI QR
        </span>

        <h3 className="text-2xl font-black text-theme-main mt-2">
          Pay ₹{manualUPIOrder.totalAmount.toLocaleString('en-IN')}
        </h3>
        <p className="text-xs text-theme-muted mt-0.5">
          Order ID: <strong className="text-[var(--brand-primary)] font-mono">{orderId}</strong> ({manualUPIOrder.planName})
        </p>

        {/* Uploaded Customer GPay QR Image */}
        <div className="my-3 p-2.5 rounded-2xl bg-white border border-gray-200 inline-block shadow-lg max-w-[240px]">
          <img
            src="/payment-qr.jpg"
            alt="Official GPay QR Code - amin lalani (aminlalani0-3@okaxis)"
            className="w-full h-auto max-h-[250px] object-contain rounded-xl mx-auto"
          />
        </div>

        <div className="space-y-3 text-left">
          
          {/* Copy UPI ID button */}
          <button
            onClick={copyUPI}
            className="w-full py-2.5 px-4 text-xs font-extrabold rounded-xl border border-theme bg-theme-secondary text-theme-main flex items-center justify-center gap-2 hover:bg-theme-secondary/80 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>Copy UPI ID ({siteConfig.contact.upiId})</span>
          </button>

          {/* 12-Digit UTR Number Input */}
          <div className="pt-1">
            <label className="block text-[11px] font-black uppercase tracking-wider text-theme-main mb-1">
              Enter 12-Digit UTR / Transaction Ref No. *
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 absolute left-3 top-3 text-theme-muted" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={12}
                placeholder="e.g. 420198765432"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full min-h-[44px] pl-9 pr-3 py-2 text-xs sm:text-sm font-mono font-bold rounded-xl border border-theme bg-theme-card text-theme-main focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none tracking-wider"
              />
            </div>
            <p className="text-[10px] text-theme-muted mt-1">
              Find this 12-digit UTR/Ref No. in your GPay/PhonePe receipt after payment.
            </p>
          </div>

          {utrError && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-[11px] font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{utrError}</span>
            </div>
          )}

          {/* WhatsApp Payment Confirmation */}
          <button
            onClick={handleWhatsAppPaidSubmit}
            className="w-full py-3.5 px-5 font-extrabold text-xs sm:text-sm btn-brand-secondary flex items-center justify-center gap-2 shadow-xl rounded-2xl active:scale-95 transition-transform"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Confirm Payment & Send UTR on WhatsApp</span>
          </button>

        </div>

      </div>
    </div>
  );
};
