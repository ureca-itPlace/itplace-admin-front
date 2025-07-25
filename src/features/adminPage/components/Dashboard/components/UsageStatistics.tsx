import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { UsageDataItem, LegendItem } from '../../../types/types';

interface UsageStatisticsProps {
  title: string;
  subtitle: string;
  data: UsageDataItem[];
  legends: LegendItem[];
  className?: string;
}

const CustomTick = (props: { x: number; y: number; payload: { value: string } }) => {
  const { x, y, payload } = props;
  const maxLength = 8;
  const text = payload.value;
  const isLong = text.length > maxLength;
  const displayText = isLong ? text.slice(0, maxLength) + '...' : text;
  return (
    <text
      x={x}
      y={y}
      dy={20}
      textAnchor="middle"
      className="text-black text-body-2 max-md:text-[6px]"
      style={{ cursor: isLong ? 'pointer' : 'default' }}
    >
      {displayText}
      {isLong && <title>{text}</title>}
    </text>
  );
};

const UsageStatistics = ({
  title,
  subtitle,
  data,
  legends,
  className = 'w-[836px] h-[382px] max-md:w-full max-md:h-auto',
}: UsageStatisticsProps) => {
  return (
    <div className={`bg-white p-6 rounded-[18px] ${className}`}>
      <div className="flex items-center justify-between mb-4 max-md:flex-col max-md:items-start">
        <div className="flex max-md:flex-col items-center max-md:items-start">
          <h3 className="text-title-4 max-md:text-title-6">{title}</h3>
          <span className="text-body-1 text-grey04 mt-1 ml-3 max-md:ml-0 max-md:mt-1 max-md:mb-2 max-md:text-body-3 max-md:block">
            {subtitle}
          </span>
        </div>
        <div className="flex items-center mr-[40px] text-body-1 mt-0 max-md:mt-3 max-md:w-full max-md:flex-wrap">
          {legends.map((legend, index) => (
            <div
              key={legend.key}
              className={`flex items-center ${index > 0 ? 'ml-[24px]' : ''} max-md:ml-0 max-md:mr-4 max-md:mb-2`}
            >
              <div className={`w-3 h-3 ${legend.color}`}></div>
              <span className="text-body-1 max-md:text-body-3 text-grey04 ml-[12px]">
                {legend.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-72 max-md:h-56 mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="partnerName"
              tick={CustomTick}
              interval={0} // 모든 tick 표시
              tickLine={false}
              angle={-30} // tick을 30도 기울임
            />
            <YAxis />
            <Bar dataKey="vvipUsageCount" fill="#7638FA" radius={[10, 10, 0, 0]} />
            <Bar dataKey="vipUsageCount" fill="#A175FF" radius={[10, 10, 0, 0]} />
            <Bar dataKey="basicUsageCount" fill="#CDB5FF" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageStatistics;
