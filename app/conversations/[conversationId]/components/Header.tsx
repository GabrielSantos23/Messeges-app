'use client';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useContext, useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';
import { ThemeContext } from '@/app/components/ThemeContext';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className={` ${
          theme === 'light' ? 'bg-white ' : 'bg-gray-800'
        } flex w-full  border-b 
        ${
          theme === 'light' ? 'lg:border-gray-200' : 'lg:border-gray-900'
        }    sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm`}
      >
        <div className='flex gap-3 items-center'>
          <Link
            className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
            href='/conversations'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div
            className={`${
              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
            } flex flex-col`}
          >
            <div>{conversation.name || otherUser.name}</div>
            <div
              className={`text-sm font-light ${
                theme === 'light' ? 'text-neutral-300' : 'text-gray-500'
              } `}
            >
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
          onClick={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
};

export default Header;
