import { NextResponse } from 'next/server';
import { getAllOrders, getAllInquiries } from '@/lib/orderStore';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const orders = getAllOrders();
    const inquiries = getAllInquiries();

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === 'PAID')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const vegCount = orders.filter((o) => o.planId === 'veg').length;
    const nonVegCount = orders.filter((o) => o.planId === 'veg-nonveg').length;
    const activeSubscriptions = orders.filter((o) => o.orderStatus === 'ACTIVE' || o.orderStatus === 'NEW').length;

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders: orders.length,
        activeSubscriptions,
        totalRevenue,
        vegCount,
        nonVegCount,
        totalInquiries: inquiries.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to calculate stats' },
      { status: 500 }
    );
  }
}
