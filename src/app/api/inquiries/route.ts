import { NextResponse } from 'next/server';
import { getAllInquiries, saveInquiry } from '@/lib/orderStore';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const inquiries = getAllInquiries();
    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, eventType, guestCount, eventDate, notes } = body;

    if (!name || !phone || !eventType) {
      return NextResponse.json(
        { success: false, error: 'Missing required inquiry fields (name, phone, eventType)' },
        { status: 400 }
      );
    }

    const inquiry = saveInquiry({
      name,
      phone,
      eventType,
      guestCount: guestCount || 10,
      eventDate: eventDate || new Date().toISOString().split('T')[0],
      notes: notes || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Catering inquiry logged successfully',
      inquiry,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to log inquiry' },
      { status: 500 }
    );
  }
}
