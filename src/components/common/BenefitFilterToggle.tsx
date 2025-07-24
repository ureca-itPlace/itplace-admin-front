type FilterType = 'default' | 'vipkok';

interface BenefitFilterToggleProps {
  value: FilterType;
  onChange: (val: FilterType) => void;
  width?: string; // w-[300px] 같은 tailwind 클래스
  fontSize?: string; // text-title-7 등
}

export default function BenefitFilterToggle({
  value,
  onChange,
  width = 'w-[300px]',
  fontSize = 'text-title-7',
}: BenefitFilterToggleProps) {
  return (
    <div
      className={`flex items-center ${width} h-[50px] bg-grey01 rounded-[10px] border border-grey02 `}
    >
      <button
        onClick={() => onChange('default')}
        className={`flex-1 h-[42px] rounded-[8px] ${fontSize} transition-colors flex items-center justify-center ${
          value === 'default' ? 'bg-white text-purple04 shadow-sm' : 'bg-transparent text-grey03'
        }`}
      >
        기본 혜택
      </button>
      <button
        onClick={() => onChange('vipkok')}
        className={`flex-1 h-[42px] rounded-[8px] ${fontSize} transition-colors flex items-center justify-center ${
          value === 'vipkok' ? 'bg-white text-purple04 shadow-sm' : 'bg-transparent text-grey03'
        }`}
      >
        VIP 콕
      </button>
    </div>
  );
}
