// import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '../lib/perplexica/utils';
// import Sidebar from '../components/Sidebar';
// import { Toaster } from 'sonner';
import ThemeProvider from '../components/theme/Provider';


import '@workspace/ui/globals.css';

import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { APP_DESCRIPTION, APP_NAME } from '@workspace/common/app';
import { baseUrl } from '@workspace/routes';
import { Toaster } from '@workspace/ui/components/sonner';

import { Providers } from './providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

// export const metadata: Metadata = {
//   metadataBase: new URL(baseUrl.Dashboard),
//   title: APP_NAME,
//   description: APP_DESCRIPTION,
//   icons: {
//     icon: '/favicon.ico',
//     shortcut: '/favicon-32x32.png',
//     apple: '/apple-touch-icon.png'
//   },
//   manifest: `${baseUrl.Dashboard}/manifest`,
//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     siteName: APP_NAME,
//     title: APP_NAME,
//     description: APP_DESCRIPTION,
//     url: baseUrl.Dashboard,
//     images: {
//       url: `${baseUrl.Dashboard}/og-image`,
//       width: 1200,
//       height: 630,
//       alt: APP_NAME
//     }
//   },
//   robots: {
//     index: true,
//     follow: true
//   }
// };

const inter = Inter({ subsets: ['latin'] });

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Perplexica - Chat with the internet',
  description:
    'Perplexica is an AI powered chatbot that is connected to the internet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body className={cn('h-full', montserrat.className)}>
        <ThemeProvider>
          <Providers>
          {/* <Sidebar> */}

            {children}
            <React.Suspense>
            <Toaster />
          </React.Suspense>
          {/* </Sidebar> */}

        </Providers>

          {/* <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  'bg-light-primary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2',
              },
            }}
          /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
