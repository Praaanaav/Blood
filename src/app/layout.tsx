import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BloodBank Landing',
  description: 'A modern landing page for a Blood Bank Management System.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
