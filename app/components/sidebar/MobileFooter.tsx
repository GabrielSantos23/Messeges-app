'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import MobileItem from './MobileItem';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const { theme } = useContext(ThemeContext);

  if (isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed justify-between w-full bottom-0 z-40 flex items-center ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      } border-t-[1px] lg:hidden`}
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
