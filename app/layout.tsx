import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ 
  subsets: ["latin"], 
  variable: "--font-geist-sans",
  display: "swap",
});
const _geistMono = Geist_Mono({ 
  subsets: ["latin"], 
  variable: "--font-geist-mono",
  display: "swap",
});
const _playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair", 
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'PIJO — Patatas Fritas con Actitud',
  description: 'Sabores gourmet que no existen en el supermercado. Patatas fritas artesanales con personalidad propia. Descubre los sabores de PIJO.',
  generator: 'v0.app',
  keywords: ['patatas fritas', 'snacks gourmet', 'aperitivos artesanales', 'PIJO', 'patatas premium', 'snacks españoles'],
  authors: [{ name: 'PIJO' }],
  creator: 'PIJO',
  publisher: 'PIJO',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://patataspijo.com',
    siteName: 'PIJO',
    title: 'PIJO — Patatas Fritas con Actitud',
    description: 'Sabores gourmet que no existen en el supermercado. Patatas fritas artesanales con personalidad propia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PIJO - Patatas Fritas con Actitud',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIJO — Patatas Fritas con Actitud',
    description: 'Sabores gourmet que no existen en el supermercado. Patatas fritas artesanales con personalidad propia.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${_geist.variable} ${_geistMono.variable} ${_playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
