'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
      group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold  text-gray-500 ${
        theme === 'light' ? 'hover:text-black' : 'hover:text-gray-300'
      }  ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}
      `,
          active && theme === 'light' && 'bg-gray-100 text-black',
          active && theme === 'dark' && 'bg-gray-800 text-white'
        )}
      >
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
