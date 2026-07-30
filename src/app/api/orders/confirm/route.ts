import { NextResponse } from 'next/server';
import { updateOrder } from '@/lib/orderStore';

export const dynamic = 'force-static';

export async function POST(req: Request) {
  try {
    const { id, transactionRef } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const updated = updateOrder(id, {
      paymentStatus: 'PAID',
      orderStatus: 'ACTIVE',
      paymentId: transactionRef || `VERIFIED-${Date.now().toString().slice(-6)}`,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Order ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Payment confirmed in database for order ${id}. Subscription activated!`,
      order: updated,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to confirm payment in database' },
      { status: 500 }
    );
  }
}
