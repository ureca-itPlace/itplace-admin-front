import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ClickDataItem } from '../../../types/types';

interface ClickStatisticsProps {
  title: string;
  subtitle: string;
  data: ClickDataItem[];
  className?: string;
}

// Recharts PieLabelProps 직접 정의 (일부 속성만 사용)
type CustomPieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  value?: number;
};

const renderCustomizedLabel = (props: CustomPieLabelProps) => {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, value } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-body-4 max-md:text-body-5"
    >
      {typeof value === 'number' ? `${value.toLocaleString()}회` : ''}
    </text>
  );
};

const ClickStatistics = ({
  title,
  subtitle,
  data,
  className = 'w-[5146px] h-[382px] max-md:w-full max-md:h-auto',
}: ClickStatisticsProps) => {
  return (
    <div className={`bg-white p-6 rounded-[18px] ${className}`}>
      <h3 className="text-title-4 max-md:text-title-6 mb-4">
        {title}
        <span className="block text-body-1 max-md:text-body-3 text-grey04 mt-1">{subtitle}</span>
      </h3>
      <div className="flex items-center">
        <div className="w-[230px] h-64 max-md:w-[100px] max-md:h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                // innerRadius와 outerRadius를 퍼센트 값으로 변경
                innerRadius="40%"
                outerRadius="100%"
                paddingAngle={5}
                dataKey="clickCount"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 ml-[60px]">
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 max-md:w-2 max-md:h-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex-1">
                  <div className="text-body-1 max-md:text-body-3 text-grey04">
                    {item.partnerName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickStatistics;
