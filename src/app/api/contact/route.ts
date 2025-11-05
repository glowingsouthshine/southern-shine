import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).optional().or(z.literal('')),
  message: z.string().min(10),
});

function getTo(): string {
  return process.env.NOTIFY_TO || process.env.NOTIFY_FALLBACK || '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, phone, message } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <h2>New Contact Message — A Southern Glow</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const fromLabel = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'A Southern Glow';
    const to = getTo();
    if (!to) {
      return NextResponse.json({ ok: false, error: 'No NOTIFY_TO configured' }, { status: 500 });
    }
    await resend.emails.send({
      from: `${fromLabel} <noreply@${process.env.RESEND_DOMAIN || 'resend.dev'}>`,
      to: [to],
      reply_to: email,
      subject: `Website Contact - ${name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Failed to send message' }, { status: 500 });
  }
}

