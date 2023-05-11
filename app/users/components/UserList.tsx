'use client';

import { User } from '@prisma/client';
import UserBox from './UserBox';
import { useContext } from 'react';
import { ThemeContext } from '@/app/components/ThemeContext';

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <aside
        className={`fixed ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        } inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-gray-200 block w-full left-0`}
      >
        <div className='px-5'>
          <div className='flex-col'>
            <div
              className={`text-2xl font-bold ${
                theme === 'light' ? 'text-neutral-800' : 'text-gray-200'
              }  py-4`}
            >
              People
            </div>
          </div>
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default UserList;
