export interface Plan {
  id: 'veg' | 'veg-nonveg';
  name: string;
  subtitle: string;
  price: number;
  tiffinsCount: number;
  period: string;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  items: string[];
  nonVegNote?: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'veg' | 'nonveg' | 'thali';
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  favoritePlan: string;
}

export const siteConfig = {
  brandName: "Home Made Tiffin",
  serviceTitle: "North & South Combination",
  taglinePrimary: "Pure Home Made Tiffin",
  taglineSecondary: "North & South Combination — Homemade Tiffin!",
  positioning: "100% Pure & Hygienic Food • Separate Kitchen for Veg • Everyday Different Menu",
  
  contact: {
    phonePrimary: "7702911453",
    phoneDisplay: "+91 77029 11453",
    whatsappNumber: "917702911453",
    paymentPhone: "9553529093",
    paymentPhoneDisplay: "+91 95535 29093",
    paymentName: "amin lalani",
    upiId: "aminlalani0-3@okaxis",
    qrImagePath: "/payment-qr.jpg",
    email: "orders@homemadetiffin.com",
    address: "Hygienic Central Kitchen, City Hub",
    serviceAreas: ["Ameerpet", "Hitech City", "Gachibowli", "Madhapur", "Kondapur", "Jubilee Hills", "Kukatpally", "Banjara Hills", "Secunderabad"],
  },

  payments: {
    acceptedMethods: ["GPay", "PhonePe", "Paytm", "UPI", "Credit/Debit Cards", "Netbanking"],
    manualUPIPhone: "9553529093",
  },

  plans: [
    {
      id: 'veg',
      name: 'Veg Tiffin Box',
      subtitle: '100% Pure Vegetarian Delight',
      price: 3200,
      tiffinsCount: 30,
      period: 'Monthly Subscription',
      tagline: 'Homely, balanced vegetarian meals prepared in a dedicated 100% veg kitchen.',
      isPopular: false,
      items: [
        '100% Pure Veg Kitchen',
        '2 Sabji (1 Dry + 1 Gravy Special)',
        'Dal Tadka / Sambhar / Rasam',
        'Steamed Basmati Rice',
        'Soft Roti / Chapati (2 Pcs)',
        'Fresh Green Salad',
        'Fresh Curd / Raita'
      ]
    },
    {
      id: 'veg-nonveg',
      name: 'Veg & Non-Veg Tiffin Box',
      subtitle: 'Best of Both Worlds',
      price: 3500,
      tiffinsCount: 30,
      period: 'Monthly Subscription',
      badge: 'MOST POPULAR',
      isPopular: true,
      tagline: 'Authentic daily meals with 2 special Non-Veg days (Chicken Curry) every week!',
      nonVegNote: 'Weekly 2 Days Non-Veg Special (Homestyle Chicken Curry)',
      items: [
        'Weekly 2 Days Non-Veg Special (Chicken Curry)',
        'Daily Veg Meals (5 Days: 2 Sabji, Dal, Rice, Roti, Salad, Curd)',
        'Homestyle Tender Chicken Curry on Non-Veg Days',
        'Steamed Basmati Rice',
        'Soft Roti / Chapati (2 Pcs)',
        'Fresh Salad & Curd',
        'Strict Separate Kitchen Prep'
      ]
    }
  ] as Plan[],

  trustBadges: [
    {
      id: 'veg-kitchen',
      title: 'Separate Kitchen for Veg',
      description: 'Dedicated cookware, utensils & cooking staff exclusively for vegetarian preparations.',
      iconName: 'UtensilsCrossed'
    },
    {
      id: 'everyday-menu',
      title: 'Everyday Different Menu',
      description: 'Exciting rotation of North & South Indian recipes so mealtime never feels repetitive.',
      iconName: 'CalendarDays'
    },
    {
      id: 'hygiene',
      title: '100% Pure & Hygienic',
      description: 'Cooked with FSSAI-grade standards, filtered water, and zero artificial preservatives.',
      iconName: 'ShieldCheck'
    },
    {
      id: 'customization',
      title: 'Customisation Options',
      description: 'Less oil, no onion/garlic, extra roti or spicy preference — tailored to your taste.',
      iconName: 'Sliders'
    },
    {
      id: 'free-delivery',
      title: 'Free Home & Office Delivery',
      description: 'Hot, fresh tiffins delivered right to your doorstep at your preferred lunch/dinner time.',
      iconName: 'Truck'
    }
  ] as TrustBadge[],

  useCases: [
    {
      id: 'birthdays',
      title: 'Birthday Parties',
      description: 'Delicious homemade catering boxes that guests love without high restaurant bills.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      iconName: 'Cake'
    },
    {
      id: 'get-togethers',
      title: 'Get-Togethers',
      description: 'Homely thali spreads for house parties and weekend friends gatherings.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      iconName: 'Users'
    },
    {
      id: 'office-parties',
      title: 'Office Parties',
      description: 'Hygienic bulk lunch tiffins delivered straight to corporate offices & tech parks.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
      iconName: 'Briefcase'
    },
    {
      id: 'family-functions',
      title: 'Family Functions',
      description: 'Wholesome North & South combo spreads for pujas, anniversaries and rituals.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      iconName: 'HeartHandshake'
    }
  ] as UseCase[],

  gallery: [
    {
      id: 'g1',
      title: 'Special North & South Combo Thali',
      category: 'thali',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
      description: 'Basmati Rice, Paneer Butter Masala, Sambar, Soft Rotis, Curd & Fresh Salad.'
    },
    {
      id: 'g2',
      title: 'Homestyle Chicken Curry',
      category: 'nonveg',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      description: 'Tender chicken simmered in traditional spices served on Non-Veg days.'
    },
    {
      id: 'g3',
      title: 'Pure Veg Royal Meal',
      category: 'veg',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      description: 'Aloo Gobi, Dal Tadka, Steamed Rice, Phulkas, Pickle and Fresh Salad.'
    },
    {
      id: 'g4',
      title: 'South Indian Sambar & Rice Special',
      category: 'veg',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      description: 'Aromatic homemade drumstick sambar with ghee rice and papad.'
    },
    {
      id: 'g5',
      title: 'Fresh Rotis & Sabji Duo',
      category: 'thali',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      description: 'Piping hot wheat rotis served with seasonal vegetables.'
    },
    {
      id: 'g6',
      title: 'Chicken Curry & Rice Combo',
      category: 'nonveg',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
      description: 'Rich gravy chicken curry accompanied by fluffy long grain rice.'
    }
  ] as GalleryItem[],

  testimonials: [
    {
      id: 't1',
      name: 'Rajesh Sharma',
      location: 'Hitech City, Hyderabad',
      role: 'Software Engineer',
      rating: 5,
      comment: 'Being from North India, finding authentic homemade taste was tough until I subscribed to Home Made Tiffin. The roti is soft, dal tastes like mom made it, and the 100% separate veg kitchen gives complete peace of mind!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      favoritePlan: 'Veg Tiffin Box'
    },
    {
      id: 't2',
      name: 'Priya Reddy',
      location: 'Gachibowli, Hyderabad',
      role: 'Product Manager',
      rating: 5,
      comment: 'The Veg & Non-Veg plan is perfect! 2 days chicken curry every week feels like a treat. Delivery is super punctual every lunch break, and the food is never overly oily.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      favoritePlan: 'Veg & Non-Veg Box'
    },
    {
      id: 't3',
      name: 'Vikram Joshi',
      location: 'Madhapur, Hyderabad',
      role: 'Bank Officer',
      rating: 5,
      comment: 'We booked them for my son’s birthday party for 25 people. Everyone praised the hygienic packing and authentic flavor. Absolutely reliable tiffin service!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      favoritePlan: 'Veg Tiffin Box'
    }
  ] as Testimonial[],
};
