'use client';

import { useContext, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import { ThemeContext } from '@/app/components/ThemeContext';

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
}) => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className='relative w-full flex gap-3 '>
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className={` ${
          theme === 'light' ? 'text-black' : 'text-white'
        }   font-light py-2 ${
          theme === 'light' ? 'bg-neutral-100' : 'bg-gray-700'
        } px-4  w-full rounded-full focus:outline-none `}
      />
      {/* <button
        className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
        onClick={() => setIsOpenEmoji(!isOpenEmoji)}
      >
        <BsEmojiSmile size={18} className='text-white' />
      </button> */}
      {isOpenEmoji && (
        <div className='absolute right-10 bottom-16'>
          <EmojiPicker />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
