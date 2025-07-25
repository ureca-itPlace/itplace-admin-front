import { WishlistItem } from '../../../types/types';

interface WishlistChartProps {
  title: string;
  subtitle: string;
  data: WishlistItem[];
  className?: string;
}

const WishlistChart = ({
  title,
  subtitle,
  data,
  className = 'w-[836px] h-[345px] max-md:w-full max-md:h-auto',
}: WishlistChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.favoriteCount));

  return (
    <div className={`bg-white p-6 rounded-[18px] ${className}`}>
      {/* 5개로 할 거면 mb-[30px], space-y-[24px]로 */}
      <h3 className="text-title-4 max-md:text-title-6 mb-4">
        {title}
        <span className="max-md:block text-body-1 max-md:text-body-3 text-grey04 ml-3 max-md:ml-0 mt-1">
          {subtitle}
        </span>
      </h3>
      <div className="space-y-[24px]">
        {data.map((item, index) => {
          const barWidth = (item.favoriteCount / maxValue) * 100;

          return (
            <div key={index} className="flex items-center">
              <span className="text-body-1 max-md:text-body-3 w-[200px] max-md:w-[150px] flex-shrink-0 truncate">
                {item.partnerName}
                {item.mainCategory && (
                  <span className="text-grey04 text-body-3 max-md:text-body-5 ml-1">
                    ({item.mainCategory})
                  </span>
                )}
              </span>
              <div className="flex-1 mx-2 max-md:hidden">
                <div className="relative h-6 bg-grey01 rounded-full">
                  <div
                    className="h-full rounded-full animate-grow-width"
                    style={{
                      backgroundColor: item.color,
                      width: `${barWidth}%`,
                      animationDelay: `${index * 0.1}s`,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      animation: `growWidth 1s ease-out ${index * 0.1}s forwards`,
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-body-2 max-md:text-body-4 text-black w-[15%] max-md:w-[50%] text-right flex-shrink-0">
                ({item.favoriteCount}회)
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes growWidth {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default WishlistChart;
