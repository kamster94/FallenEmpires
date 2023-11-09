import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Eczar } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import MainNavigation from '@/components/Navigation/MainNavigation';
import background from '../../public/background.jpg';

const eczar = Eczar({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eczar',
});

export const metadata: Metadata = {
  title: 'Age of Fallen Empires',
  description: 'Original setting for Pathfinder 2e',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={eczar.variable} style={{ backgroundImage: `url(${background.src})` }}>
          <div className="flex h-screen flex-col justify-between font-sans">
            <Navbar
              mainNavigation={<MainNavigation className="hidden md:flex items-center justify-start"/>}
              mobileNavigation={<MainNavigation className="flex flex-col space-y-2"/>}
            />
            <main className="mb-auto mx-auto flex-1 px-4 md:px-24 lg:px-32 xl:px-48 w-full">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
