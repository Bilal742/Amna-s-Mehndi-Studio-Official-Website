"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import Footer from "./components/Footer/footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}>
        <SessionProvider>

          <ThemeProvider>
            <Navbar />
            <motion.img
              src="/patterns/bg1.png"
              alt="Floating Mehndi Motif"
              className="fixed top-0 left-0 w-64 h-64 opacity-40 pointer-events-none"
              animate={{ y: [0, 50, 0] }} 
              transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
            />

            <motion.img
              src="/patterns/bg.png"
              alt="Floating Mehndi Motif"
              className="fixed bottom-0 right-0 w-64 h-64 opacity-40 pointer-events-none"
              animate={{ y: [0, -50, 0], x: [0, -20, 0] }} 
              transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
            />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
