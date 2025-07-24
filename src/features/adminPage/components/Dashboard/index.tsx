import { useState, useEffect } from 'react';
import RankingList from './components/RankingList';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import WishlistChart from './components/WishlistChart';
import ClickStatistics from './components/ClickStatistics';
import UsageStatistics from './components/UsageStatistics';
import {
  getPartnersSearchRanking,
  PartnerSearchRankingItem,
  getMostClickedPartners,
  MostClickedPartnerItem,
  getFavoritesStatistics,
  FavoriteBenefitItem,
  getPartnerUsageStats,
  PartnerUsageStatsItem,
} from './apis/DashboardApis';
import { RankingItem, ClickDataItem, WishlistItem, UsageDataItem } from '../../types/types';

// API 응답을 RankingItem으로 변환하는 함수
const convertToRankingItem = (apiData: PartnerSearchRankingItem[]): RankingItem[] => {
  return apiData.map((item) => {
    let trend: 'up' | 'down' | 'keep' = 'keep';

    // API 응답의 changeDerection 필드를 기반으로 트렌드 설정
    switch (item.changeDerection) {
      case 'UP':
        trend = 'up';
        break;
      case 'DOWN':
        trend = 'down';
        break;
      case 'SAME':
      case 'NEW':
      default:
        trend = 'keep';
        break;
    }

    return {
      partnerName: item.partnerName,
      searchCount: item.searchCount,
      trend: trend,
      rankChange: item.rankChange,
    };
  });
};

// API 응답을 ClickDataItem으로 변환하는 함수
const convertToClickDataItem = (apiData: MostClickedPartnerItem[]): ClickDataItem[] => {
  const colors = ['#250961', '#530CC2', '#7638FA', '#A175FF', '#CDB5FF'];

  return apiData.map((item, index) => ({
    partnerName: item.partnerName,
    clickCount: item.clickCount,
    color: colors[index % colors.length],
  }));
};

// API 응답을 WishlistItem으로 변환하는 함수
const convertToWishlistItem = (apiData: FavoriteBenefitItem[]): WishlistItem[] => {
  const colors = ['#250961', '#530CC2', '#7638FA', '#A175FF', '#CDB5FF'];

  return apiData.map((item, index) => ({
    partnerName: item.partnerName,
    favoriteCount: item.favoriteCount,
    mainCategory: item.mainCategory,
    color: colors[index % colors.length],
  }));
};

// API 응답을 UsageDataItem으로 변환하는 함수
const convertToUsageDataItem = (apiData: PartnerUsageStatsItem[]): UsageDataItem[] => {
  return apiData.map((item) => ({
    partnerName: item.partnerName,
    vvipUsageCount: item.vvipUsageCount,
    vipUsageCount: item.vipUsageCount,
    basicUsageCount: item.basicUsageCount,
  }));
};

// 이용 통계 범례 데이터
const usageStatisticsLegends = [
  { key: 'vvip', label: 'VVIP', color: 'bg-purple04', fillColor: '#7638FA' },
  { key: 'vip', label: 'VIP', color: 'bg-purple03', fillColor: '#A175FF' },
  { key: 'regular', label: '우수', color: 'bg-purple02', fillColor: '#CDB5FF' },
];

const Dashboard = () => {
  const [searchRankingData, setSearchRankingData] = useState<RankingItem[]>([]);
  const [clickData, setClickData] = useState<ClickDataItem[]>([]);
  const [wishlistData, setWishlistData] = useState<WishlistItem[]>([]);
  const [usageData, setUsageData] = useState<UsageDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // 모든 API를 병렬로 호출
        const [searchRankingResponse, mostClickedResponse, favoritesResponse, usageStatsResponse] =
          await Promise.all([
            getPartnersSearchRanking(2, 3, 5), // recentperiod, prevperiod, limit
            getMostClickedPartners(5), // limit
            getFavoritesStatistics(5), // limit (Swagger default 4)
            getPartnerUsageStats(365), // period (일 단위, Swagger default 365)
          ]);

        // 모든 데이터를 한 번에 변환하고 설정 (새로운 API 응답 구조에 맞게)
        const searchRankingItems = convertToRankingItem(searchRankingResponse.data);
        const clickDataItems = convertToClickDataItem(mostClickedResponse.data);
        const wishlistItems = convertToWishlistItem(favoritesResponse.data);
        const usageDataItems = convertToUsageDataItem(usageStatsResponse.data);

        setSearchRankingData(searchRankingItems);
        setClickData(clickDataItems);
        setWishlistData(wishlistItems);
        setUsageData(usageDataItems);
      } catch (err) {
        console.error('대시보드 데이터 조회 실패:', err);
        // 에러 발생 시 빈 배열로 초기화
        setSearchRankingData([]);
        setClickData([]);
        setWishlistData([]);
        setUsageData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="pl-[28px] pt-[32px] pr-[28px] h-full">
        <h2 className="text-title-3 mb-[40px]">대시 보드</h2>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner className="h-12 w-12 border-4 border-purple04 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="pl-[28px] pt-[32px] pr-[28px] h-full">
      <h2 className="text-title-3 mb-[40px]">대시 보드</h2>

      {/* 상단 섹션 */}
      <div className="flex gap-[28px] mb-[28px] max-md:flex-col">
        <RankingList
          title="제휴처 검색 순위"
          subtitle="회원이 가장 많이 검색한 제휴처 Top 5"
          data={searchRankingData}
          className="w-[546px] h-[345px] max-md:w-full max-md:h-auto"
        />
        <WishlistChart
          title="제휴처별 관심 통계"
          subtitle="회원이 가장 관심 있는 제휴처 Top 5"
          data={wishlistData}
          className="w-[836px] h-[345px] max-md:w-full max-md:h-auto"
        />
      </div>

      {/* 하단 섹션 */}
      <div className="flex gap-[28px] max-md:flex-col">
        <ClickStatistics
          title="자주 클릭한 제휴처"
          subtitle="회원 행동 기반 클릭 통계 집계 결과"
          data={clickData}
          className="w-[546px] h-[382px] max-md:w-full max-md:h-auto"
        />
        <UsageStatistics
          title="제휴처별 이용 통계"
          subtitle="회원이 가장 많이 이용한 제휴처 Top 5"
          data={usageData}
          legends={usageStatisticsLegends}
          className="w-[836px] h-[382px] max-md:w-full max-md:h-auto"
        />
      </div>
    </div>
  );
};

export default Dashboard;
