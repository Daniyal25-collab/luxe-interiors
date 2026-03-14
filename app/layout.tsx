import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Cinzel } from 'next/font/google';
import '@/styles/globals.css';
import AnalyticsProvider from '@/components/AnalyticsProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Luxe Interiors — Transforming Spaces Into Timeless Designs',
    template: '%s | Luxe Interiors',
  },
  description:
    'Award-winning interior design studio specialising in luxury residential and commercial spaces. Explore our portfolio, pricing plans, and book a consultation.',
  keywords: [
    'interior design',
    'luxury interiors',
    'home design',
    'interior designer',
    'room design',
    'commercial interiors',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Luxe Interiors',
    title: 'Luxe Interiors — Transforming Spaces Into Timeless Designs',
    description:
      'Award-winning interior design studio specialising in luxury residential and commercial spaces.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Luxe Interiors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxe Interiors',
    description: 'Transforming Spaces Into Timeless Designs',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${cinzel.variable}`}
    >
      <body className="font-body antialiased">
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8H3J2K9LMP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TH2ZB28GYQ');
            `,
          }}
        />
      </body>
    </html>
  );
}
