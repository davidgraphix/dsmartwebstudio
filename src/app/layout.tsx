import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SITE } from "@/data/site";
import { CurrencyProvider } from "@/providers/CurrencyProvider";
import { QuoteProvider } from "@/providers/QuoteProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { JsonLd } from "@/components/JsonLd";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "DSmart Web Studio — Web Development, Software & SEO",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "web development company",
    "website development",
    "web design",
    "software development",
    "web application development",
    "mobile app development",
    "SEO services",
    "business website",
    "e-commerce development",
    "admin dashboard",
    "custom software development",
    "digital studio Nigeria",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  // The navy-background lockup is the right asset for icon slots that must be
  // opaque and square — iOS composites a touch icon onto black otherwise.
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo-jpeg.PNG", sizes: "1254x1254", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "DSmart Web Studio — We build digital products that help businesses grow",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DSmart Web Studio — Digital products that help businesses grow",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#02167F" },
    { media: "(prefers-color-scheme: dark)", color: "#04061A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <JsonLd data={jsonLd(organizationSchema(), websiteSchema())} />
      </head>
      <body className="antialiased">
        <CurrencyProvider>
          <QuoteProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <StickyMobileCTA />
          </QuoteProvider>
        </CurrencyProvider>

        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
