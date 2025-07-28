import React from 'react';

interface FilterDropdownMenuProps {
  options: Array<{ label: string; value: string }>;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const FilterDropdownMenu: React.FC<FilterDropdownMenuProps> = ({
  options,
  selectedValue,
  onSelect,
  onClose,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`absolute top-full mt-2 bg-white rounded-[10px] shadow-lg border border-grey02 z-50 ${className}`}
      style={{ width: 'calc(50% - 6px)', ...style }}
      tabIndex={-1}
    >
      <ul className="py-2">
        {options.map((opt) => (
          <li
            key={opt.value}
            className={`px-5 py-2 cursor-pointer text-body-3 text-black hover:bg-grey01 rounded-lg transition-colors ${
              selectedValue === opt.value ? 'bg-grey01' : ''
            }`}
            onClick={() => {
              onSelect(opt.value);
              onClose();
            }}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdownMenu;
