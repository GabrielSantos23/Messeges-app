'use client';

import Image from 'next/image';
import AuthForm from './components/AuthForm';
import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import Head from 'next/head';
export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      }  `}
    >
      <Head>
        <title>Messanger</title>
      </Head>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          alt='logo'
          height={48}
          width={48}
          className='mx-auto w-auto'
          src={'/images/logo.png'}
        />
        <h2
          className={`mt-6 text-center font-bold tracking-tight ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-200'
          } `}
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
