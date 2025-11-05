import type { MetadataRoute } from 'next';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://asouthernglow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const push = (path: string, priority = 0.7) => urls.push({ url: `${site}${path}`, lastModified: new Date(), changeFrequency: 'weekly', priority });
  // Home
  urls.push({ url: site, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 });
  // Services
  push('/services');
  const serviceSlugs = ['standard-clean','deep-clean','move-in-out-clean','car-detailing'];
  serviceSlugs.forEach(s => push(`/services/${s}`));
  // Areas
  push('/areas');
  ['oak-ridge','knoxville','sevierville','farragut','maryville','alcoa','powell','lenoir-city','clinton'].forEach(a => push(`/areas/${a}`));
  // Quote page
  push('/quote');
  return urls;
}
