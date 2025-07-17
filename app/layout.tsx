import { Navbar } from '@/components/layouts/navigation/navbar';
import { AppProvider } from '@/lib/providers';
import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'KP Events',
  description: 'Kumar Piccadilly Wakad Society Events Management Website',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

const interSans = Inter({
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${interSans.className}antialiased`}
      >
        <AppProvider>
          <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_1fr]">
            <Navbar />
            <main className="p-4">{children}</main>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  border: '1px solid var(--color-popover-foreground)',
                  padding: '16px',
                  backgroundColor: 'var(--color-popover)',
                  color: 'var(--color-popover-foreground)',
                },
                success: {
                  style: {
                    border: '1px solid var(--color-success)',
                    color: 'var(--color-success)',
                  },
                },
                error: {
                  style: {
                    border: '1px solid var(--color-destructive)',
                    color: 'var(--color-destructive)',
                  },
                },
              }}
            />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
