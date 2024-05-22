import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Load the Inter font from Google Fonts with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Define metadata for the web application
export const metadata: Metadata = {
  title: 'LearnWell',
  description: 'Learn anything',
  icons: {
    icon: '/favicon.ico',
  },
};

/**
 * Navbar Component
 * A navigation bar that provides links to different pages.
 */
const Navbar: React.FC = () => {
  return (
    <div className="bg-base-100 shadow">
      <div className="container sm:px-1 mx-auto md:px-11">
        <div className="navbar flex justify-between items-center">
          <div className="flex-1">
            {/* Logo link to the home page */}
            <Link href="/">
              <Image
                src="/FULL_LOGO_DARK.png"
                alt="Logo"
                className="h-10 mr-3"
                width={200}
                height={75}
                layout="responsive"
              />
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Videos</Link>
              </li>
              <li>
                <Link href="/videos/new">Add Video</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * RootLayout Component
 * The root layout of the application which includes the head metadata, navbar, and children components.
 *
 * @param {Object} props - The properties object
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="winter">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
