'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { MenuPlans } from '@/components/MenuPlans';
import { PerfectFor } from '@/components/PerfectFor';
import { Gallery } from '@/components/Gallery';
import { OrderForm } from '@/components/OrderForm';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { PaymentSuccessModal, OrderDetails } from '@/components/PaymentSuccessModal';
import { ManualUPIModal } from '@/components/ManualUPIModal';

export default function Home() {
  const [selectedPlanId, setSelectedPlanId] = useState<'veg' | 'veg-nonveg'>('veg');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [manualUPIOrder, setManualUPIOrder] = useState<OrderDetails | null>(null);

  const handleSelectPlan = (planId: 'veg' | 'veg-nonveg') => {
    setSelectedPlanId(planId);
  };

  const handleOrderComplete = (details: OrderDetails) => {
    setCompletedOrder(details);
    setManualUPIOrder(null);
  };

  const handleOpenManualUPI = (details: OrderDetails) => {
    setManualUPIOrder(details);
  };

  const handleConfirmManualUPIPaid = (details: OrderDetails) => {
    setCompletedOrder({
      ...details,
      paymentMethod: 'manual-upi',
    });
    setManualUPIOrder(null);
  };

  return (
    <main className="min-h-screen bg-theme-main text-theme-main transition-colors duration-300">
      
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Trust Badges Row */}
      <TrustBadges />

      {/* 4. Menu & Subscription Plans */}
      <MenuPlans onSelectPlan={handleSelectPlan} />

      {/* 5. Perfect For Use Cases */}
      <PerfectFor />

      {/* 6. Food Gallery Section */}
      <Gallery />

      {/* 7. Order & Subscription Form */}
      <OrderForm
        selectedPlanId={selectedPlanId}
        onOrderComplete={handleOrderComplete}
        onOpenManualUPI={handleOpenManualUPI}
      />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Contact & Footer */}
      <Footer />

      {/* 10. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Manual UPI Scan & Pay Modal */}
      {manualUPIOrder && (
        <ManualUPIModal
          manualUPIOrder={manualUPIOrder}
          onClose={() => setManualUPIOrder(null)}
          onConfirmPaid={handleConfirmManualUPIPaid}
        />
      )}

      {/* Payment Success Celebration Modal */}
      {completedOrder && (
        <PaymentSuccessModal
          orderDetails={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

    </main>
  );
}
