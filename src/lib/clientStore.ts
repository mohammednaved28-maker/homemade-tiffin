'use client';

import { SavedOrder, Inquiry } from './orderStore';

const STORAGE_ORDERS_KEY = 'homemade_tiffin_orders_v3';
const STORAGE_INQUIRIES_KEY = 'homemade_tiffin_inquiries_v3';

// Dedicated Global Real-Time Cloud DB Bucket ID
const CLOUD_STORE_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019fb320fb504d56';

export const INITIAL_DEMO_ORDERS: SavedOrder[] = [
  {
    id: 'HT17131',
    customerName: 'hhhh',
    customerPhone: '8919060962',
    address: 'hehhh',
    planId: 'veg',
    planName: 'Veg Tiffin Box',
    startDate: '2026-07-31',
    tiffinsCount: 30,
    totalAmount: 3200,
    instructions: '',
    paymentMethod: 'manual-upi',
    paymentStatus: 'PAID',
    orderStatus: 'ACTIVE',
    paymentId: 'HT17131',
    utrNumber: '123464646466',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'HT10096',
    customerName: 'Naved',
    customerPhone: '9246086721',
    address: 'hyderabad',
    planId: 'veg',
    planName: 'Veg Tiffin Box',
    startDate: '2026-07-31',
    tiffinsCount: 30,
    totalAmount: 3200,
    instructions: '',
    paymentMethod: 'manual-upi',
    paymentStatus: 'PAID',
    orderStatus: 'COMPLETED',
    paymentId: 'HT10096',
    utrNumber: '243555355535',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'HT-1001',
    customerName: 'Rajesh Sharma',
    customerPhone: '9876543210',
    address: 'Flat 302, Cyber Heights, Main Road, Hitech City, Hyderabad',
    planId: 'veg',
    planName: 'Veg Tiffin Box',
    startDate: '2026-08-01',
    tiffinsCount: 30,
    totalAmount: 3200,
    instructions: 'Less oil in sabji please',
    paymentMethod: 'manual-upi',
    paymentStatus: 'PENDING',
    orderStatus: 'NEW',
    paymentId: 'HT-1001',
    utrNumber: '420198765432',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'HT-1002',
    customerName: 'Priya Reddy',
    customerPhone: '9123456789',
    address: 'Plot 45, Road No 10, Jubilee Hills, Hyderabad',
    planId: 'veg-nonveg',
    planName: 'Veg & Non-Veg Tiffin Box',
    startDate: '2026-08-02',
    tiffinsCount: 30,
    totalAmount: 3500,
    instructions: 'Deliver around 1:15 PM',
    paymentMethod: 'manual-upi',
    paymentStatus: 'PAID',
    orderStatus: 'CANCELLED',
    paymentId: 'HT-1002',
    utrNumber: '420188992211',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const INITIAL_DEMO_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-501',
    name: 'Vikram Joshi',
    phone: '9988776655',
    eventType: 'Birthday Party Catering',
    guestCount: 25,
    eventDate: '2026-08-15',
    notes: 'Need 25 Veg thalis delivered to Madhapur',
    createdAt: new Date().toISOString(),
  }
];

export function getClientOrders(): SavedOrder[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_ORDERS;
  try {
    const data = localStorage.getItem(STORAGE_ORDERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
    return INITIAL_DEMO_ORDERS;
  } catch (e) {
    return INITIAL_DEMO_ORDERS;
  }
}

// Push latest order list to Cloud Storage so ALL devices sync in real-time
export async function pushOrdersToCloud(orders: SavedOrder[]) {
  try {
    await fetch(CLOUD_STORE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Home Made Tiffin Live Production Orders Store',
        data: { orders },
      }),
    });
  } catch (err) {
    console.warn('Cloud store sync push failed:', err);
  }
}

// Fetch orders from Cloud Storage (placed by customers on mobile phones anywhere)
export async function syncOrdersFromCloud(): Promise<SavedOrder[]> {
  const localOrders = getClientOrders();
  try {
    const res = await fetch(CLOUD_STORE_URL, { cache: 'no-store' });
    const json = await res.json();
    const cloudOrders: SavedOrder[] = json?.data?.orders;

    if (Array.isArray(cloudOrders) && cloudOrders.length > 0) {
      // Merge cloud orders with local orders by ID
      const orderMap = new Map<string, SavedOrder>();
      
      // Add local orders first
      localOrders.forEach(o => orderMap.set(o.id, o));
      // Overwrite/add cloud orders (cloud takes priority)
      cloudOrders.forEach(o => orderMap.set(o.id, o));

      const merged = Array.from(orderMap.values());
      // Sort newest first
      merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(merged));
      }
      return merged;
    }
  } catch (err) {
    console.warn('Cloud sync fetch failed, using local orders:', err);
  }
  return localOrders;
}

export function saveClientOrder(orderData: Omit<SavedOrder, 'id' | 'createdAt'> & { id?: string }): SavedOrder {
  const currentOrders = getClientOrders();
  
  const newOrder: SavedOrder = {
    ...orderData,
    id: orderData.id || `HT${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };

  const updatedOrders = [newOrder, ...currentOrders.filter((o) => o.id !== newOrder.id)];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event('tiffin_order_placed'));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  // Push to Global Cloud Store immediately
  pushOrdersToCloud(updatedOrders);

  return newOrder;
}

export function updateClientOrderStatus(id: string, updates: Partial<SavedOrder>): SavedOrder | null {
  const currentOrders = getClientOrders();
  const index = currentOrders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const updated = { ...currentOrders[index], ...updates };
  currentOrders[index] = updated;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(currentOrders));
      window.dispatchEvent(new Event('tiffin_order_placed'));
    } catch (e) {
      console.error('LocalStorage update error:', e);
    }
  }

  // Push updated status to Global Cloud Store
  pushOrdersToCloud(currentOrders);

  return updated;
}

export function getClientInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_INQUIRIES;
  try {
    const data = localStorage.getItem(STORAGE_INQUIRIES_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(INITIAL_DEMO_INQUIRIES));
    return INITIAL_DEMO_INQUIRIES;
  } catch (e) {
    return INITIAL_DEMO_INQUIRIES;
  }
}
