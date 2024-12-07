import type { Metadata, Viewport } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";

const poppins = Poppins({
  style: 'normal',
  weight: ['400', '500', '600'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Policonsultorio",
  description: "Pagina para un policonsultorio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
