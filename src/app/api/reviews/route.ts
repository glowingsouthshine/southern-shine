import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const reviewSchema = z.object({
  name: z.string().min(2),
  review: z.string().min(10),
  rating: z.number().min(1).max(5).default(5),
});

function getTo(): string {
  return process.env.NOTIFY_TO || process.env.NOTIFY_FALLBACK || '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // Email the review to owner; no DB required for Vercel free
    const { name, review, rating } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromLabel = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'A Southern Glow';
    const to = getTo();
    if (!to) {
      return NextResponse.json({ ok: false, error: 'No NOTIFY_TO configured' }, { status: 500 });
    }
    await resend.emails.send({
      from: `${fromLabel} <noreply@${process.env.RESEND_DOMAIN || 'resend.dev'}>`,
      to: [to],
      subject: `New Review - ${name} (${rating}★)`,
      html: `<h2>New Review</h2><p><strong>Name:</strong> ${name}</p><p><strong>Rating:</strong> ${rating}</p><p><strong>Review:</strong> ${review}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Failed to submit review' }, { status: 500 });
  }
}

