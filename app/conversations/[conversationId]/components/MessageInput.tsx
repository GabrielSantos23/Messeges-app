'use client';

import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

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

  return (
    <div className='relative w-full flex gap-3'>
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
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
