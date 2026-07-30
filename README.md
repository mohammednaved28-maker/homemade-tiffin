# North & South Combination — Homemade Tiffin Website

A premium, production-ready, mobile-first meal subscription web application built with **Next.js**, **React 19**, **Tailwind CSS**, and **Razorpay Payment Gateway Integration**.

---

## 🌟 Key Features

1. **3 Selectable Live Themes (Header Toggle)**:
   - **Theme 1: Classic Green & Saffron** — Warm, homely, traditional food brand aesthetic (`#1B4332` & `#F4713E`).
   - **Theme 2: Modern Minimal** — Sleek charcoal & terracotta editorial design (`#1F2937` & `#C1502E`).
   - **Theme 3: Vibrant Food Delivery** — High-energy Swiggy/Zomato app style (`#FF6B35` & `#F72C2C`).

2. **11 Complete Responsive Sections**:
   - **Header/Navbar** with logo (house + cooking pot), sticky nav links, theme switcher, Call (`7702911453`), and WhatsApp CTAs.
   - **Hero Section** with bold headlines, positioning badges, stats, and food showcase.
   - **Trust Badges Row** highlighting 5 key services (Separate Kitchen for Veg, Everyday Different Menu, 100% Pure Hygiene, Customization, Free Delivery).
   - **Menu / Plans Section** with side-by-side subscription cards:
     - **Veg Tiffin Box**: ₹3200 for 30 tiffins
     - **Veg & Non-Veg Tiffin Box**: ₹3500 for 30 tiffins (Weekly 2 days Chicken Curry)
   - **Perfect For Section** detailing catering for Birthdays, Get-togethers, Office Parties, and Family Functions.
   - **Interactive Food Gallery** with category filter tabs and full-screen Lightbox modal preview.
   - **Mobile-Optimized Order Form** with numeric keypad telephone input, date picker, plan selector, tiffin counter, and instant total calculation.
   - **Payment Gateway & Manual UPI**:
     - **Razorpay Checkout Gateway** via secure API backend.
     - **Manual UPI Fallback** modal displaying payment number `9553529093`, copy button, and QR Code for GPay / PhonePe / Paytm transfers.
   - **Testimonials Section** with verified 5-star customer reviews.
   - **Footer & Service Areas** listing covered locations (Hitech City, Gachibowli, Madhapur, Ameerpet, etc.).
   - **Floating WhatsApp Action Button** (`https://wa.me/917702911453`).

---

## 🚀 Quick Start & Local Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ Admin Customization Guide

### How to Update Prices, Menu Items & Phone Numbers
All content is centralized in **`src/config/siteConfig.ts`**. You can edit details without touching UI code:

- **Primary Call/WhatsApp Number**: Edit `siteConfig.contact.phonePrimary` (`7702911453`).
- **Payment Phone Number**: Edit `siteConfig.contact.paymentPhone` (`9553529093`).
- **Subscription Prices**: Edit `siteConfig.plans[0].price` (e.g. `3200`) or `siteConfig.plans[1].price` (`3500`).
- **Menu Items & Copy**: Update items array in `siteConfig.plans`.

---

## 💳 Razorpay Test & Live API Key Setup

### Test Mode (Default Built-In Simulation)
If no Razorpay keys are provided in `.env.local`, the application automatically runs in **Simulated Test Mode**, allowing you to test the complete order flow, success celebration modal, and WhatsApp message generation smoothly without error.

### Swapping for Live API Keys
When ready for production deployment:
1. Log in to your [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Go to **Settings -> API Keys** and generate Live Key ID & Secret.
3. Open or create `.env.local` (or set Environment Variables in Vercel / Netlify):
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id_here
   RAZORPAY_KEY_SECRET=your_key_secret_here
   ```
4. Restart your server or redeploy. Razorpay Checkout will now process real payments directly to your bank account!
