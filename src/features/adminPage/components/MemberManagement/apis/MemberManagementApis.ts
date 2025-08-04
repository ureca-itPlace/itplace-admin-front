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

// 회원 데이터 타입 (API 응답 구조에 맞춤)
export interface Member {
  id: number; // userId -> id로 변경
  name: string; // userName -> name으로 변경
  email: string;
  phoneNumber: string;
  birthday: string;
  grade: 'VVIP' | 'VIP' | 'BASIC' | null;
  userType: 'LINKED' | 'STANDARD';
}

// 회원 통계 응답 타입 (단순 숫자로 변경)
export interface MemberStatistics {
  totalUsers: number;
  timestamp?: string;
}

// 배치 갱신 결과 타입
export interface BatchRefreshResult {
  totalProcessed: number;
  newUsers: number;
  updatedUsers: number;
  deactivatedUsers: number;
  failedUsers: number;
  processingTime: string;
  startTime: string;
  endTime: string;
}

// 사용자 혜택 이용내역 타입 (필드명 변경)
export interface MembershipUsage {
  benefitId: number;
  benefitName: string;
  usedAt: string; // usageDate -> usedAt으로 변경
  discountAmount: number;
}

export interface UserDetail {
  userId: number;
  userName: string;
  membershipId: string | null; // string으로 변경
  membershipGrade: string | null;
  membershipUsage: MembershipUsage[];
}

// 전체 사용자 수 조회 API
export const getTotalUserCount = async (): Promise<ApiResponse<number>> => {
  const response = await api.get('/api/v1/users/total');
  return response.data;
};

// 전체 사용자 목록 조회 API
export const getAllUsers = async (
  userType?: 'LINKED' | 'STANDARD',
  grade?: 'VVIP' | 'VIP' | 'BASIC',
  page: number = 0,
  size: number = 8,
  sort: string = 'id,asc'
): Promise<ApiResponse<PagedResponse<Member>>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  if (userType) params.append('userType', userType);
  if (grade) params.append('grade', grade);

  const response = await api.get(`/api/v1/users?${params}`);
  return response.data;
};

// 사용자 검색 API
export const searchUsers = async (
  keyword: string,
  page: number = 0,
  size: number = 8
): Promise<ApiResponse<PagedResponse<Member>>> => {
  const params = new URLSearchParams({
    keyword,
    page: page.toString(),
    size: size.toString(),
  });

  const response = await api.get(`/api/v1/users/search?${params}`);
  return response.data;
};

// 사용자 혜택 이용내역 조회 API
export const getUserBenefitUsage = async (userId: number): Promise<ApiResponse<UserDetail>> => {
  const response = await api.get(`/api/v1/users/${userId}`);
  return response.data;
};

// 통신사 고객 정보 타입
export interface CarrierUserInfo {
  carrierUserId: string;
  userName: string;
  grade: 'BASIC' | 'VIP' | 'VVIP';
  phoneNumber: string;
  gender?: string;
  birthday?: string;
  membershipId?: number;
  lastUpdated?: string;
}

// 사용자 정보 배치 갱신 API
export const refreshUserBatch = async (
  carrierUsers: CarrierUserInfo[]
): Promise<ApiResponse<{ batchResult: BatchRefreshResult }>> => {
  const response = await api.post('/api/v1/users/batch-refresh', { carrierUsers });
  return response.data;
};

// 기존 함수들을 새로운 API 구조에 맞게 래핑
export const getMembersWithPagination = async (
  page: number = 1,
  itemsPerPage: number = 8,
  userType?: string,
  grade?: string
): Promise<{
  data: Member[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}> => {
  try {
    const response = await getAllUsers(
      userType as 'LINKED' | 'STANDARD' | undefined,
      grade as 'VVIP' | 'VIP' | 'BASIC' | undefined,
      page - 1, // API는 0부터 시작하므로 -1
      itemsPerPage
    );

    return {
      data: response.data.content,
      totalItems: response.data.totalElements,
      totalPages: response.data.totalPages,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  } catch {
    // 에러 발생시 빈 데이터 반환
    return {
      data: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }
};

export const searchMembersWithPagination = async (
  keyword: string,
  page: number = 1,
  itemsPerPage: number = 8
): Promise<{
  data: Member[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}> => {
  try {
    const response = await searchUsers(
      keyword,
      page - 1, // API는 0부터 시작하므로 -1
      itemsPerPage
    );

    return {
      data: response.data.content,
      totalItems: response.data.totalElements,
      totalPages: response.data.totalPages,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  } catch {
    // 에러 발생시 빈 데이터 반환
    return {
      data: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }
};

export const getMemberStatistics = async (): Promise<MemberStatistics> => {
  try {
    const response = await getTotalUserCount();
    return {
      totalUsers: response.data,
      timestamp: response.timestamp,
    };
  } catch {
    // 에러 발생시 빈 데이터 반환
    return {
      totalUsers: 0,
      timestamp: new Date().toISOString(),
    };
  }
};
