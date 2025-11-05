import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const requestSchema = z.object({
  serviceType: z.string().min(2),
  sqft: z.string().optional().default(''),
  addons: z.array(z.string()).optional().default([]),
  total: z.number().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  date: z.string().optional().default(''),
  notes: z.string().optional().default(''),
});

function getTo(): string {
  return process.env.NOTIFY_TO || process.env.NOTIFY_FALLBACK || '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <h2>New Service Request — A Southern Glow</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Address:</strong> ${data.address}</li>
        ${data.date ? `<li><strong>Preferred Date:</strong> ${new Date(data.date).toLocaleString()}</li>` : ''}
        <li><strong>Service:</strong> ${data.serviceType}</li>
        <li><strong>SqFt:</strong> ${data.sqft || '-'}</li>
        <li><strong>Add-ons:</strong> ${data.addons?.join(', ') || '-'}</li>
        <li><strong>Est. Total:</strong> ${data.total ?? '-'}</li>
        ${data.notes ? `<li><strong>Notes:</strong> ${data.notes}</li>` : ''}
      </ul>
    `;

    const fromLabel = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'A Southern Glow';
    const to = getTo();
    if (!to) {
      return NextResponse.json({ ok: false, error: 'No NOTIFY_TO configured' }, { status: 500 });
    }
    await resend.emails.send({
      from: `${fromLabel} <noreply@${process.env.RESEND_DOMAIN || 'resend.dev'}>`,
      to: [to],
      reply_to: data.email,
      subject: `New Booking - ${data.serviceType} for ${data.name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Failed to submit request' }, { status: 500 });
  }
}

