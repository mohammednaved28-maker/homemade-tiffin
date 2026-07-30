import fs from 'fs';
import path from 'path';

export interface SavedOrder {
  id: string;
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
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  orderStatus: 'NEW' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  paymentId?: string;
  utrNumber?: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  notes?: string;
  createdAt: string;
}

let memoryOrders: SavedOrder[] = [
  {
    id: 'HT-1001',
    customerName: 'Rajesh Sharma',
    customerPhone: '9876543210',
    address: 'Flat 302, Cyber Heights, Hitech City, Hyderabad',
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
    address: 'Plot 45, Jubilee Hills, Hyderabad',
    planId: 'veg-nonveg',
    planName: 'Veg & Non-Veg Tiffin Box',
    startDate: '2026-08-02',
    tiffinsCount: 30,
    totalAmount: 3500,
    instructions: 'Deliver around 1:15 PM',
    paymentMethod: 'manual-upi',
    paymentStatus: 'PAID',
    orderStatus: 'ACTIVE',
    paymentId: 'HT-1002',
    utrNumber: '420188992211',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

let memoryInquiries: Inquiry[] = [
  {
    id: 'INQ-501',
    name: 'Vikram Joshi',
    phone: '9988776655',
    eventType: 'Birthday Party',
    guestCount: 25,
    eventDate: '2026-08-15',
    notes: 'Need 25 Veg thalis delivered to Madhapur',
    createdAt: new Date().toISOString(),
  }
];

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    // Ignore read-only filesystem errors in serverless
  }
}

export function getAllOrders(): SavedOrder[] {
  try {
    ensureDataDir();
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Using memory store for orders:', err);
  }
  return memoryOrders;
}

export function saveOrder(orderData: Omit<SavedOrder, 'id' | 'createdAt'> & { id?: string }): SavedOrder {
  const newOrder: SavedOrder = {
    ...orderData,
    id: orderData.id || `HT${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };

  memoryOrders.unshift(newOrder);

  try {
    ensureDataDir();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(memoryOrders, null, 2));
  } catch (err) {
    console.warn('Could not persist order to disk, kept in memory:', err);
  }

  return newOrder;
}

export function updateOrder(id: string, updates: Partial<SavedOrder>): SavedOrder | null {
  const index = memoryOrders.findIndex(o => o.id === id);
  if (index === -1) return null;

  memoryOrders[index] = { ...memoryOrders[index], ...updates };

  try {
    ensureDataDir();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(memoryOrders, null, 2));
  } catch (err) {
    console.warn('Could not update order on disk:', err);
  }

  return memoryOrders[index];
}

export function getAllInquiries(): Inquiry[] {
  try {
    ensureDataDir();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Using memory store for inquiries:', err);
  }
  return memoryInquiries;
}

export function saveInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
  };

  memoryInquiries.unshift(newInquiry);

  try {
    ensureDataDir();
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(memoryInquiries, null, 2));
  } catch (err) {
    console.warn('Could not persist inquiry to disk:', err);
  }

  return newInquiry;
}
