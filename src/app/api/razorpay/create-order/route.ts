import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, planId, customerName, customerPhone } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount provided' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Fallback simulation mode if live/test keys are not yet added in environment variables
    if (!keyId || !keySecret || keyId.includes('YOUR_') || keySecret.includes('YOUR_')) {
      const mockOrderId = `order_sim_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      return NextResponse.json({
        success: true,
        isSimulated: true,
        orderId: mockOrderId,
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        keyId: 'rzp_test_simulated_key',
        message: 'Running in simulated test mode. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env for live API payments.'
      });
    }

    // Initialize Razorpay SDK
    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: amount * 100, // Razorpay takes amount in paise (₹3200 = 320000 paise)
      currency: 'INR',
      receipt: `receipt_tiffin_${Date.now()}`,
      notes: {
        planId: planId || 'tiffin-plan',
        customerName: customerName || 'Valued Customer',
        customerPhone: customerPhone || '',
      },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      success: true,
      isSimulated: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
    });

  } catch (error: any) {
    console.error('Error creating Razorpay Order:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
