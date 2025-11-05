'use client';

import React, { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErrors({});
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors || { general: [json.error || 'Something went wrong'] });
        setOk(false);
        trackEvent('form_error', { form_id: 'contact' });
      } else {
        setOk(true);
        form.reset();
        trackEvent('submit_form', { form_id: 'contact' });
        trackEvent('contact', { method: 'contact_form' });
      }
    } catch (err) {
      setOk(false);
      trackEvent('form_error', { form_id: 'contact' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-describedby="contact-status" aria-live="polite" id="contact">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
        {errors.name && <p className="text-sm text-red-600">{errors.name.join(', ')}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border px-3 py-2" />
        {errors.email && <p className="text-sm text-red-600">{errors.email.join(', ')}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input id="phone" name="phone" className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-md border px-3 py-2" />
        {errors.message && <p className="text-sm text-red-600">{errors.message.join(', ')}</p>}
      </div>
      <button type="submit" className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white disabled:opacity-50" disabled={loading}>
        {loading ? 'Sending…' : 'Send'}
      </button>
      <div id="contact-status" className="sr-only">
        {ok === true ? 'Message sent successfully' : ok === false ? 'Message failed' : ''}
      </div>
      {ok === true && <p className="text-green-700">Thanks! We’ll be in touch shortly.</p>}
      {ok === false && <p className="text-red-700">We couldn’t send your message. Please try again.</p>}
    </form>
  );
}
