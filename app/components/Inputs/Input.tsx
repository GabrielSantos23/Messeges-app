'use client';

import clsx from 'clsx';
import { useContext } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { ThemeContext } from '../ThemeContext';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <label
        className={`block text-sm font-medium leading-6 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-200'
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          type={type}
          autoComplete={id}
          {...register(id, { required })}
          id={type}
          className={clsx(
            `
          form-input
          block w-full rounded-md border-0 py-1.5 ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-200'
          } shadow-sm ring-1 ring-inset  ${
              theme === 'light' ? 'ring-gray-300' : 'ring-gray-500'
            } placeholder:text-gray-40 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6
          `,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default',
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          )}
        />
      </div>
    </div>
  );
};

export default Input;
