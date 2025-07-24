import api from '../../../../../apis/axiosInstance';

// API 응답 타입
export interface ApiResponse<T = unknown> {
  code: string;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

// 페이지네이션 응답 타입
export interface PagedResponse<T> {
  content: T[];
  page: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

// 제휴처 데이터 타입 (API 응답 구조에 맞춤)
export interface Partner {
  benefitId: number;
  benefitName: string; // partnerName -> benefitName으로 변경
  mainCategory: string;
  category: string;
  type: 'FREE' | 'DISCOUNT'; // 영문으로 변경
  image: string;
  searchRank: number;
  favoriteRank: number;
  usageRank: number;
}

// 혜택 등급별 상세 정보 타입
export interface TierBenefit {
  grade: 'BASIC' | 'VIP' | 'VVIP';
  context: string;
  isAll: boolean;
}

// 혜택 상세 정보 타입
export interface BenefitDetail {
  benefitId: number;
  benefitName: string;
  description: string;
  benefitLimit: string;
  manual: string;
  url: string;
  partnerName: string;
  image: string;
  tierBenefits: TierBenefit[];
}

// 배치 갱신 결과 타입
export interface BenefitBatchRefreshResult {
  totalProcessed: number;
  newBenefits: number;
  updatedBenefits: number;
  deactivatedBenefits: number;
  failedBenefits: number;
  conflictResolutions: number;
  processingTime: string;
  startTime: string;
  endTime: string;
}

// 통신사 혜택 정보 타입
export interface CarrierBenefitInfo {
  carrierBenefitId: number;
  partnerName: string;
  benefitName: string;
  mainCategory: 'VIP콕' | '기본 혜택';
  category: string;
  benefitType?: 'DISCOUNT' | 'FREE_GIFT';
  benefitLimit?: string;
  description?: string;
  manual?: string;
  lastUpdated?: string;
}

// 전체 제휴처 수 조회 API
export const getTotalBenefitCount = async (): Promise<ApiResponse<number>> => {
  const response = await api.get('/api/v1/benefits/total');
  return response.data;
};

// 전체 제휴처 목록 조회 API
export const getAllPartners = async (
  mainCategory?: 'BASIC_BENEFIT' | 'VIP_COCK',
  category?: string,
  type?: 'FREE' | 'DISCOUNT',
  keyword?: string,
  page: number = 0,
  size: number = 8,
  sortBy: string = 'id',
  direction: string = 'asc'
): Promise<ApiResponse<PagedResponse<Partner>>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortBy,
    direction,
  });

  if (mainCategory) params.append('mainCategory', mainCategory);
  if (category) params.append('category', category);
  if (type) params.append('type', type);
  if (keyword) params.append('keyword', keyword);

  const response = await api.get(`/api/v1/benefits?${params}`);
  return response.data;
};

// 제휴처 검색 API (일반 목록 조회와 동일하게 처리)
export const searchBenefits = async (
  keyword: string,
  page: number = 0,
  size: number = 8,
  sortBy: string = 'id',
  direction: string = 'asc'
): Promise<ApiResponse<PagedResponse<Partner>>> => {
  return getAllPartners(undefined, undefined, undefined, keyword, page, size, sortBy, direction);
};

// 혜택 상세 조회 API
export const getBenefitDetail = async (benefitId: number): Promise<ApiResponse<BenefitDetail>> => {
  const response = await api.get(`/api/v1/benefit/${benefitId}`);
  return response.data;
};

// 혜택 정보 수정 API
export const updateBenefit = async (
  benefitId: number,
  benefitData: { benefitLimit?: string; manual?: string }
): Promise<ApiResponse<null>> => {
  const response = await api.put(`/api/v1/benefit/${benefitId}`, benefitData);
  return response.data;
};

// 혜택 정보 배치 갱신 API
export const refreshBenefitBatch = async (
  carrierBenefits: CarrierBenefitInfo[]
): Promise<ApiResponse<{ batchResult: BenefitBatchRefreshResult }>> => {
  const response = await api.post('/api/v1/benefits/batch-refresh', { carrierBenefits });
  return response.data;
};
