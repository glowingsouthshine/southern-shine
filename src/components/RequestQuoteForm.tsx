'use client';

import React, { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const ADDONS = [
  { id: 'fridge', name: 'Inside Fridge', price: 30 },
  { id: 'oven', name: 'Inside Oven', price: 30 },
  { id: 'windows', name: 'Interior Windows', price: 50 },
  { id: 'laundry', name: 'Laundry (per load)', price: 25 },
];

export default function RequestQuoteForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [addons, setAddons] = useState<string[]>([]);

  function toggleAddon(id: string) {
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: any = Object.fromEntries(fd.entries());
    payload.addons = addons;
    if (payload.date) payload.date = new Date(payload.date as string).toISOString();

    try {
      const res = await fetch('/api/request-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors || { general: [json.error || 'Something went wrong'] });
        setOk(false);
        trackEvent('form_error', { form_id: 'quote' });
      } else {
        setOk(true);
        form.reset();
        setAddons([]);
        trackEvent('submit_form', { form_id: 'quote' });
        trackEvent('generate_lead', { method: 'request_service' });
      }
    } catch (err) {
      setOk(false);
      trackEvent('form_error', { form_id: 'quote' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" id="quote" aria-describedby="quote-status" aria-live="polite">
      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium">Service</label>
        <select id="serviceType" name="serviceType" required className="mt-1 w-full rounded-md border px-3 py-2">
          <option value="">Select…</option>
          <option>Standard Clean</option>
          <option>Deep Clean</option>
          <option>Move-In/Out Clean</option>
          <option>Office Cleaning</option>
          <option>Car Detailing</option>
        </select>
        {errors.serviceType && <p className="text-sm text-red-600">{errors.serviceType.join(', ')}</p>}
      </div>
      <div>
        <label htmlFor="sqft" className="block text-sm font-medium">Approx. Sq Ft</label>
        <input id="sqft" name="sqft" className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Add-ons</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {ADDONS.map(a => (
            <label key={a.id} className="flex items-center gap-2">
              <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggleAddon(a.id)} />
              <span>{a.name} (${a.price})</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input id="name" name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.join(', ')}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" name="email" required type="email" className="mt-1 w-full rounded-md border px-3 py-2" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.join(', ')}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input id="phone" name="phone" required className="mt-1 w-full rounded-md border px-3 py-2" />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.join(', ')}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address (or Service Area)</label>
          <input id="address" name="address" required placeholder="Oak Ridge / Knoxville / Sevierville" className="mt-1 w-full rounded-md border px-3 py-2" />
          {errors.address && <p className="text-sm text-red-600">{errors.address.join(', ')}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium">Preferred Date</label>
        <input id="date" name="date" required type="date" className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">Notes</label>
        <textarea id="notes" name="notes" rows={4} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <button type="submit" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50" disabled={loading}>
        {loading ? 'Submitting…' : 'Request Quote'}
      </button>
      <div id="quote-status" className="sr-only">
        {ok === true ? 'Request submitted' : ok === false ? 'Submission failed' : ''}
      </div>
      {ok === true && <p className="text-green-700">Thanks! We'll confirm shortly.</p>}
      {ok === false && <p className="text-red-700">We couldn't submit your request. Please try again.</p>}
    </form>
  );
}

