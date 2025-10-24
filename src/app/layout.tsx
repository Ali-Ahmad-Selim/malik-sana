import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Fitters",
  description: "Stichers",
  icons: {
    icon: {
      url: "/favicon.jpg",
      sizes: "32x32",
      type: "image/png",
    }
    // },
    // apple: {
    //   url: "/favicon.png",
    //   sizes: "180x180",
    //   type: "image/png",
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header/>
        {children}
                <Footer/>      

      </body>
    </html>
  );
}