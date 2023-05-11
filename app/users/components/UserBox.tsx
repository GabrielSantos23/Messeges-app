'use client';

import Avatar from '@/app/components/Avatar';
import LoadingModal from '@/app/components/LoadingModal';
import { ThemeContext } from '@/app/components/ThemeContext';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className={`w-full relative flex items-center space-x-3 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }  p-3 ${
          theme === 'light' ? 'hover:bg-neutral-100' : 'hover:bg-gray-700'
        }  rounded-lg transition cursor-pointer`}
      >
        <Avatar user={data} />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between items-center mb-1'>
              <p
                className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-900' : 'text-gray-200'
                } `}
              >
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
