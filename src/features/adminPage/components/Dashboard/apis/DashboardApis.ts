import api from '../../../../../apis/axiosInstance';
import {
  mockSearchRanking,
  mockWishlistRanking,
  mockClickStatistics,
  mockUsageStatistics,
} from '../data/mockData';

// 제휴처 검색 순위 관련 타입
export interface PartnerSearchRankingItem {
  partnerName: string;
  searchCount: number;
  rank: number;
  previousRank: number | null;
  rankChange: number | null;
  changeDerection: 'UP' | 'DOWN' | 'SAME' | 'NEW';
}

// 자주 클릭한 제휴처 관련 타입 (partnerId 제거)
export interface MostClickedPartnerItem {
  partnerName: string;
  clickCount: number;
  rank: number;
}

// 즐겨찾기 통계 관련 타입
export interface FavoriteBenefitItem {
  benefitId: number;
  partnerName: string;
  benefitName: string;
  favoriteCount: number;
  mainCategory?: string; // mainCategory 추가
  rank: number;
}

// 제휴처별 이용 통계 관련 타입 (partnerId 추가)
export interface PartnerUsageStatsItem {
  partnerId: number;
  partnerName: string;
  vvipUsageCount: number;
  vipUsageCount: number;
  basicUsageCount: number;
  totalUsageCount: number;
}

export interface ApiResponse<T = unknown> {
  code: string;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

// 제휴처 검색 순위 조회 함수
export const getPartnersSearchRanking = async (
  recentperiod: number = 2,
  prevperiod: number = 3,
  limit: number = 5
): Promise<ApiResponse<PartnerSearchRankingItem[]>> => {
  try {
    const params = new URLSearchParams({
      recentperiod: recentperiod.toString(),
      prevperiod: prevperiod.toString(),
      limit: limit.toString(),
    });

    const response = await api.get(`/partners/search-ranking?${params}`);
    return response.data;
  } catch (error) {
    console.error('제휴처 검색 순위 조회 실패:', error);
    // 에러 시 더미 데이터 반환
    const limitedData = mockSearchRanking.slice(0, limit);
    return {
      code: '200',
      status: 'SUCCESS',
      message: '성공',
      data: limitedData,
      timestamp: new Date().toISOString(),
    };
  }
};

// 자주 클릭한 제휴처 조회 함수
export const getMostClickedPartners = async (
  limit: number = 5
): Promise<ApiResponse<MostClickedPartnerItem[]>> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    const response = await api.get(`/benefits/most-clicked?${params}`);
    return response.data;
  } catch (error) {
    console.error('자주 클릭한 제휴처 조회 실패:', error);
    // 에러 시 더미 데이터 반환
    const limitedData = mockClickStatistics.slice(0, limit);
    return {
      code: '200',
      status: 'SUCCESS',
      message: '성공',
      data: limitedData,
      timestamp: new Date().toISOString(),
    };
  }
};

// 즐겨찾기 통계 조회 함수
export const getFavoritesStatistics = async (
  limit: number = 5
): Promise<ApiResponse<FavoriteBenefitItem[]>> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    const response = await api.get(`/benefits/favorite?${params}`);
    return response.data;
  } catch (error) {
    console.error('즐겨찾기 통계 조회 실패:', error);
    // 에러 시 더미 데이터 반환
    const limitedData = mockWishlistRanking.slice(0, limit);
    return {
      code: '200',
      status: 'SUCCESS',
      message: '성공',
      data: limitedData,
      timestamp: new Date().toISOString(),
    };
  }
};

// 제휴처별 이용 통계 조회 함수
export const getPartnerUsageStats = async (
  period: number = 365
): Promise<ApiResponse<PartnerUsageStatsItem[]>> => {
  try {
    const params = new URLSearchParams({
      period: period.toString(),
    });

    const response = await api.get(`/partners/usage?${params}`);
    return response.data;
  } catch (error) {
    console.error('제휴처별 이용 통계 조회 실패:', error);
    // 에러 시 더미 데이터 반환
    return {
      code: '200',
      status: 'SUCCESS',
      message: '성공',
      data: mockUsageStatistics,
      timestamp: new Date().toISOString(),
    };
  }
};
