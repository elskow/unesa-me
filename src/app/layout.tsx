import '@/styles/globals.css';
import { equal } from 'assert';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'URL Shortener',
    description: 'URL shortener built with Next.js, Tailwind CSS, and MongoDB.',
};

//@ts-ignore
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <link rel="icon" href="/unesa-logo.png" />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
