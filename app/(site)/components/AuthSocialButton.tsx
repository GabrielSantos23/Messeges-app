'use client';

import { ThemeContext } from '@/app/components/ThemeContext';
import { useContext } from 'react';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      type='button'
      onClick={onClick}
      className={`inline-flex w-full justify-center rounded-md ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-950'
      } px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ${
        theme === 'light' ? 'ring-gray-300 ' : 'ring-gray-800 '
      }  hover:bg-gray-900 focus:outline-offset-0
        ${theme === 'light' ? 'hover:text-gray-900' : 'text-gray-100'}
      `}
    >
      <Icon
        className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-500'}`}
      />
    </button>
  );
};

export default AuthSocialButton;
