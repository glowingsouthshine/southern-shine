import { NextResponse } from 'next/server';
import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const reviewSchema = z.object({
  name: z.string().min(2),
  review: z.string().min(10),
  rating: z.number().min(1).max(5).default(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    await addDoc(collection(db, 'reviews'), {
      ...parsed.data,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Failed to submit review' }, { status: 500 });
  }
}
