import type { Metadata } from 'next';
import './globals.css';
import { GlobalProvider } from '@/context/global';
import ReactQueryProvider from './_components/QueryClintProvider/QueryClinetProvider';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'surgeon',
  description: 'surgeon',
  icons: {
    icon: '/nav/SurgeonLogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen flex flex-col max-w-[1400px] mx-auto  overflow-x-hidden p-2 bg-slate-100 dark:bg-slate-900  ${roboto.className}`}
      >
        <ReactQueryProvider>
          <GlobalProvider>
            <ThemeProvider attribute="class">
              <main className="min-h-screen">{children}</main>
            </ThemeProvider>
          </GlobalProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
