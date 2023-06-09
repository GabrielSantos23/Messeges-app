'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/Inputs/Input';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/app/components/ThemeContext';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)

        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }

          if (callback?.ok) {
            // router.push('/conversations');
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }

          if (callback?.ok) {
            toast.success('Logged in!');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          //   router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className={`${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }  px-4 py-4 shadow sm:rounded-lg sm:px-10`}
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              label='Name'
              register={register}
              id='name'
              errors={errors}
              type='text'
              disabled={isLoading}
            />
          )}
          <Input
            label='Email address'
            type='email'
            register={register}
            id='email'
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label='Password'
            type='password'
            register={register}
            id='password'
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div
                className={`w-full border-t ${
                  theme === 'light' ? 'border-gray-300' : 'border-gray-700'
                } `}
              />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span
                className={`${
                  theme === 'light' ? 'bg-white' : 'bg-gray-900'
                } px-2 text-gray-500`}
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              onClick={() => socialAction('github')}
              icon={BsGithub}
            />
            <AuthSocialButton
              onClick={() => socialAction('google')}
              icon={BsGoogle}
            />
          </div>
        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account'}
          </div>
          <div
            className={`underline cursor-pointer ${
              theme === 'light' ? 'text-black' : 'text-gray-400'
            }`}
            onClick={toggleVariant}
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
