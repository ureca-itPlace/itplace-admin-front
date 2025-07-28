import ActionButton from './ActionButton';
import { TbRefresh } from 'react-icons/tb';

interface MobileStatisticsCardProps {
  onRefresh?: () => void;
  totalNumbers?: number;
  title?: string;
}

const MobileStatisticsCard = ({
  title,
  onRefresh = () => {},
  totalNumbers = 0,
}: MobileStatisticsCardProps) => {
  return (
    <div className="flex items-center justify-between bg-grey01 rounded-lg px-4 py-2 w-full h-12 max-md:rounded-none max-md:px-5">
      <span className="text-title-6 text-black">{title}</span>
      <div className="flex items-center gap-2">
        <span className="text-title-6 text-purple04">{totalNumbers?.toLocaleString() || 0}</span>
        <span className="text-title-6 text-black">명</span>
        <ActionButton
          icon={<TbRefresh size={15} />}
          onClick={onRefresh}
          variant="primary"
          size={30}
        />
      </div>
    </div>
  );
};

export default MobileStatisticsCard;
