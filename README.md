# Southern Shine

This is a Next.js website for "A Southern Glow", a housekeeping and cleaning services business.

This project is built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI. It features:
- Service selection and dynamic price estimation.
- A service request submission system using Server Actions.
- A customer reviews section.
- An AI-powered tool to suggest seasonal specials.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:9002](http://localhost:9002) with your browser.

4. Configure environment variables
   - Copy `.env.example` to `.env.local` and fill in values. At minimum, set:
     - `RESEND_API_KEY` (create a free key at resend.com)
     - `RESEND_DOMAIN` (verify your domain in Resend; used for the From address)
     - `NOTIFY_TO` (your email to receive inquiries/bookings)

5. Optional: Set `NEXT_PUBLIC_SITE_URL` to your deployment URL for correct links.
6. Optional analytics:
   - `NEXT_PUBLIC_GA_ID` (e.g., G-XXXXXXX) for Google Analytics 4
   - `NEXT_PUBLIC_CLARITY_ID` for Microsoft Clarity session replay

## Deploying on Vercel (Free)

1. Push this folder to a GitHub repository.
2. In Vercel, import the repo and select the default Next.js settings.
3. Add the environment variables from `.env.example` in Vercel Project Settings → Environment Variables.
4. Trigger a deploy. API routes use Resend (HTTPS) so no SMTP is needed.

Notes:
- No Firebase or paid database is required. Submissions are delivered via email.
- If you want to store submissions, we can integrate a free Notion DB or Supabase (free tier) later.

## Tech Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- ShadCN UI
- Resend Email (free tier)
- Google Analytics (optional)
- Microsoft Clarity (optional)
- Google Genkit AI
