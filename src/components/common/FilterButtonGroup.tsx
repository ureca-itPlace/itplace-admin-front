import React from 'react';
import { TbAdjustmentsHorizontal, TbArrowsDownUp } from 'react-icons/tb';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  active?: boolean;
  iconType?: 'adjust' | 'arrows';
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  onClick,
  active,
  iconType = 'adjust',
}) => (
  <button
    type="button"
    onClick={() => {
      console.log('clicked', label);
      onClick();
    }}
    className={`flex items-center justify-center w-full h-[40px] border border-grey03 rounded-[10px] text-body-3 gap-2 transition-colors duration-150 ${
      active ? 'border-purple04 text-purple04 bg-purple01' : 'text-grey04'
    }`}
  >
    {iconType === 'arrows' ? (
      <TbArrowsDownUp size={18} className={active ? 'text-purple04' : 'text-purple04'} />
    ) : (
      <TbAdjustmentsHorizontal size={18} className={active ? 'text-purple04' : 'text-purple04'} />
    )}
    {label}
  </button>
);

// 드롭다운을 버튼 하단에 붙이기 위해 dropdowns prop 추가
interface FilterButtonGroupProps {
  buttons: Array<{
    label: string;
    onClick: () => void;
    active?: boolean;
    iconType?: 'adjust' | 'arrows'; // 모바일 순위 정렬 버튼에 arrows 아이콘 적용 가능
  }>;
  className?: string;
  dropdowns?: React.ReactNode[];
}

const FilterButtonGroup: React.FC<FilterButtonGroupProps> = ({ buttons, className, dropdowns }) => (
  <div className={`flex gap-3 w-full ${className || ''}`}>
    {buttons.map((btn, idx) => (
      <div key={btn.label + idx} className="flex-1 relative">
        <FilterButton {...btn} />
        {dropdowns && dropdowns[idx] && (
          <div className="absolute left-0 top-full w-full z-10">{dropdowns[idx]}</div>
        )}
      </div>
    ))}
  </div>
);

export default FilterButtonGroup;
