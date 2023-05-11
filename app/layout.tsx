'use client';

import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import './globals.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { ThemeContext } from '@/app/components/ThemeContext';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Messenger',
  description: 'Messenger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme !== null && storedTheme !== undefined
      ? storedTheme
      : 'light';
  });

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Head>
          <title>Messenger</title>
        </Head>
        <AuthContext>
          <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </ThemeContext.Provider>
        </AuthContext>
      </body>
    </html>
  );
}
