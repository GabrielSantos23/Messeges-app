'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const { theme } = useContext(ThemeContext);

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={onClick}
      className={clsx(
        `
    group flex gap-x-3 text-sm leading-6 font-semibold w-full text-gray-500  justify-center p-4  ${
      theme === 'light' ? 'hover:text-black' : 'hover:text-gray-300'
    }  ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'}
    `,
        active && theme === 'light' && 'bg-gray-100 text-black',
        active && theme === 'dark' && 'bg-gray-700 text-gray-200'
      )}
      href={href}
    >
      <Icon className='h-6 w-6' />
    </Link>
  );
};

export default MobileItem;
