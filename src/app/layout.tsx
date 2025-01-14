import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikDark",
  description: "TikDark",
};

const inter = Inter({
  subsets: ['latin'], // Inclua o subset que você precisa
  variable: '--font-inter', // Adiciona uma variável CSS para a fonte
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className={'antialiased'}
      >
        {children}
      </body>
    </html>
  );
}
