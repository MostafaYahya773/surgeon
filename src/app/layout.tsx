import type { Metadata } from 'next';
import './globals.css';
import { GlobalProvider } from '@/context/global';
import ReactQueryProvider from './_components/QueryClintProvider/QueryClinetProvider';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
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
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col max-w-[1600px] mx-auto overflow-x-hidden bg-slate-100 dark:bg-slate-900  ${roboto.className}`}
      >
        <ReactQueryProvider>
          <GlobalProvider>
            <main className="min-h-screen">{children}</main>
          </GlobalProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
