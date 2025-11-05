'use client';

import React from 'react';

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': (process.env.NEXT_PUBLIC_SITE_URL || '') + '/#business',
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'A Southern Glow',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://asouthernglow.com',
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+1-865-265-4105',
    image: (process.env.NEXT_PUBLIC_SITE_URL || '') + '/og.jpg',
    areaServed: [
      { '@type': 'City', name: 'Oak Ridge' },
      { '@type': 'City', name: 'Knoxville' },
      { '@type': 'City', name: 'Sevierville' },
      { '@type': 'State', name: 'Tennessee' }
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '17:00' },
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: (process.env.NEXT_PUBLIC_SITE_URL || '') + '/#quote',
      result: { '@type': 'Reservation', name: 'Cleaning Service Booking' },
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
