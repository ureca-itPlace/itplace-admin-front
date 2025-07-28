import React from 'react';
import { TbSearch, TbX } from 'react-icons/tb';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  widthClass?: string; // tailwind width class
  heightClass?: string; // tailwind height class
  backgroundColor?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
  onClear,
  widthClass,
  heightClass,
  backgroundColor,
}) => {
  return (
    <div
      className={`relative ${widthClass} ${heightClass} max-md:border max-md:border-grey03 max-md:rounded-[8px]`}
    >
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <TbSearch size={18} className="text-purple04" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-full pl-12 pr-10 rounded-[10px] text-black placeholder-grey03 placeholder:text-body-2 focus:outline-none focus:ring-0 focus:border-gray-300 ${backgroundColor || ''}`}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey03 hover:text-grey03 focus:outline-none"
          tabIndex={-1}
        >
          <TbX size={24} className="text-grey03" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
