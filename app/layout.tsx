'use client';

import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { ThemeContext } from '@/app/components/ThemeContext';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme !== null && storedTheme !== undefined) {
        setTheme(storedTheme);
      }
    }
  }, []);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
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
