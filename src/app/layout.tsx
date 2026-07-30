import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { siteConfig } from '@/config/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Pure Homemade Tiffin Service & Monthly Subscriptions`,
  description: `Order fresh, authentic ${siteConfig.brandName} with 100% pure veg & non-veg meals. Daily rotating menu, zero preservatives, free home delivery across Hyderabad. Subscribe at ₹3,200/month! Call ${siteConfig.contact.phoneDisplay}.`,
  keywords: [
    "Home Made Tiffin",
    "Homemade Tiffin Service",
    "Home Tiffin",
    "Home Tiffin Service",
    "Veg Tiffin Subscription",
    "Veg Non Veg Tiffin Box",
    "Tiffin Service Hyderabad",
    "Monthly Tiffin Subscription",
    "Homemade Food Delivery",
    "Pure Veg Tiffin",
  ],
  metadataBase: new URL('https://northsouthtiffin.surge.sh'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${siteConfig.brandName} — ${siteConfig.serviceTitle}`,
    description: `${siteConfig.taglinePrimary} — ${siteConfig.taglineSecondary}. Free Home & Office Delivery!`,
    url: 'https://northsouthtiffin.surge.sh',
    siteName: siteConfig.brandName,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: siteConfig.brandName,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} — Pure Homemade Tiffin Service`,
    description: `Hot & wholesome daily North & South Indian home tiffin delivery.`,
    images: ['https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  'name': siteConfig.brandName,
  'image': 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80',
  'description': 'Pure Homemade Tiffin Service offering 100% Veg and Veg & Non-Veg monthly subscriptions with free doorstep delivery.',
  'telephone': siteConfig.contact.phonePrimary,
  'priceRange': '₹3200 - ₹3500',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Hyderabad',
    'addressRegion': 'Telangana',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 17.4483,
    'longitude': 78.3915
  },
  'url': 'https://northsouthtiffin.surge.sh',
  'servesCuisine': ['North Indian', 'South Indian', 'Homemade', 'Vegetarian'],
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '5.0',
    'reviewCount': '500'
  },
  'hasMenu': {
    '@type': 'Menu',
    'name': 'Home Made Tiffin Monthly Plans',
    'hasMenuItem': [
      {
        '@type': 'MenuItem',
        'name': 'Veg Tiffin Box (30 Tiffins)',
        'description': '100% Pure Veg Kitchen, 2 Sabji, Dal, Rice, 2 Rotis, Salad & Curd',
        'offers': {
          '@type': 'Offer',
          'price': '3200.00',
          'priceCurrency': 'INR'
        }
      },
      {
        '@type': 'MenuItem',
        'name': 'Veg & Non-Veg Tiffin Box (30 Tiffins)',
        'description': 'Daily Veg Meals + 2 Days Weekly Homestyle Chicken Curry Special',
        'offers': {
          '@type': 'Offer',
          'price': '3500.00',
          'priceCurrency': 'INR'
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="minimal" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
