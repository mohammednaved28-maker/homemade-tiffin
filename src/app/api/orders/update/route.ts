import { NextResponse } from 'next/server';
import { updateOrder } from '@/lib/orderStore';

export const dynamic = 'force-static';

export async function POST(req: Request) {
  try {
    const { id, orderStatus, paymentStatus } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const updated = updateOrder(id, {
      ...(orderStatus ? { orderStatus } : {}),
      ...(paymentStatus ? { paymentStatus } : {}),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Order ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order ${id} updated successfully`,
      order: updated,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
