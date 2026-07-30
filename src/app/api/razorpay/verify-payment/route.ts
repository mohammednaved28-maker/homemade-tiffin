import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isSimulated } = await req.json();

    // If payment was performed in simulation mode
    if (isSimulated || razorpay_order_id?.startsWith('order_sim_')) {
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'Simulated payment verified successfully.',
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json({
        success: false,
        verified: false,
        error: 'RAZORPAY_KEY_SECRET is not configured on the server.',
      }, { status: 400 });
    }

    // Verify signature using HMAC SHA256
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'Razorpay payment verified successfully.',
      });
    } else {
      return NextResponse.json({
        success: false,
        verified: false,
        error: 'Invalid payment signature. Verification failed.',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Error verifying Razorpay Payment:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
