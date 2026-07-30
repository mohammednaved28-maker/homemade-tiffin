import { NextResponse } from 'next/server';
import { getAllOrders, saveOrder } from '@/lib/orderStore';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      customerPhone,
      address,
      planId,
      planName,
      startDate,
      tiffinsCount,
      totalAmount,
      instructions,
      paymentMethod,
      paymentStatus,
      paymentId,
    } = body;

    if (!customerName || !customerPhone || !address || !planId || !totalAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required order fields (name, phone, address, plan, amount)' },
        { status: 400 }
      );
    }

    const saved = saveOrder({
      customerName,
      customerPhone,
      address,
      planId,
      planName: planName || (planId === 'veg' ? 'Veg Tiffin Box' : 'Veg & Non-Veg Tiffin Box'),
      startDate: startDate || new Date().toISOString().split('T')[0],
      tiffinsCount: tiffinsCount || 30,
      totalAmount: totalAmount,
      instructions: instructions || '',
      paymentMethod: paymentMethod || 'manual-upi',
      paymentStatus: paymentStatus || 'PENDING',
      orderStatus: 'NEW',
      paymentId: paymentId || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Order created and saved to backend successfully',
      order: saved,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error while processing order' },
      { status: 500 }
    );
  }
}
