'use client';

import { useContext } from 'react';
import ReactSelect from 'react-select';
import { ThemeContext } from '../ThemeContext';

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === 'light' ? 'white' : 'gray.800';
  return (
    <div className='z-[100]'>
      <label
        className={`block text-sm font-medium leading-6 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-200'
        } `}
      >
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: backgroundColor,
            }),
          }}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  );
};

export default Select;
