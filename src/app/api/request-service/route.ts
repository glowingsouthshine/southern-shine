import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const requestSchema = z.object({
  serviceType: z.string().min(2),
  sqft: z.string().optional().default(''),
  addons: z.array(z.string()).optional().default([]),
  total: z.number().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  date: z.string(),
  notes: z.string().optional().default(''),
});

function getTo(): string {
  return process.env.NOTIFY_TO || process.env.NOTIFY_FALLBACK || process.env.GMAIL_USER || '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = parsed.data;

    // Save to Firestore (free Spark tier fits small volumes)
    await addDoc(collection(db, 'serviceRequests'), {
      ...data,
      createdAt: serverTimestamp(),
    });

    // Email notify
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const html = `
      <h2>New Service Request — A Southern Glow</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Address:</strong> ${data.address}</li>
        <li><strong>Preferred Date:</strong> ${new Date(data.date).toLocaleString()}</li>
        <li><strong>Service:</strong> ${data.serviceType}</li>
        <li><strong>SqFt:</strong> ${data.sqft || '-'}</li>
        <li><strong>Add-ons:</strong> ${data.addons?.join(', ') || '-'}</li>
        <li><strong>Est. Total:</strong> ${data.total ?? '-'}</li>
        ${data.notes ? `<li><strong>Notes:</strong> ${data.notes}</li>` : ''}
      </ul>
    `;

    const fromLabel = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'A Southern Glow';
    await transporter.sendMail({
      from: `"${fromLabel}" <${process.env.GMAIL_USER}>`,
      to: getTo(),
      replyTo: data.email,
      subject: `New Booking — ${data.serviceType} for ${data.name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Failed to submit request' }, { status: 500 });
  }
}
