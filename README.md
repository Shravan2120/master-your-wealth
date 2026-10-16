Master Your Wealth
A responsive website for Master Your Wealth, featuring financial-services information and a contact form that sends enquiries through a Cloudflare Worker and Resend.
Features
- Responsive layout for desktop and mobile
- Contact information and Google Maps embed
- Contact enquiry form with required-field validation
- Google reCAPTCHA verification
- Hidden honeypot field to help filter automated submissions
- Cloudflare Worker backend for validation and email delivery
- Resend email notifications sent to the configured recipient
Tech stack
- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide React
- Google reCAPTCHA
- Cloudflare Workers
- Resend
Requirements
- Node.js and npm
- A Google reCAPTCHA site key
- A deployed Cloudflare Worker configured with the required secrets
- A Resend account and verified sending domain