import { Partner } from '../apis/PartnershipManagementApis';

export const mockPartners: Partner[] = [
  {
    benefitId: 1,
    benefitName: 'CGV',
    mainCategory: '문화/여가',
    category: '영화',
    type: 'DISCOUNT',
    image: '/images/mock/cgv.png',
    searchRank: 1,
    favoriteRank: 2,
    usageRank: 1,
  },
  {
    benefitId: 2,
    benefitName: 'GS25',
    mainCategory: '생활/편의',
    category: '편의점',
    type: 'DISCOUNT',
    image: '/images/mock/gs25.png',
    searchRank: 2,
    favoriteRank: 1,
    usageRank: 3,
  },
  {
    benefitId: 3,
    benefitName: '메가박스',
    mainCategory: '문화/여가',
    category: '영화',
    type: 'DISCOUNT',
    image: '/images/admin/megabox.png',
    searchRank: 3,
    favoriteRank: 3,
    usageRank: 2,
  },
  {
    benefitId: 4,
    benefitName: '롯데월드',
    mainCategory: '액티비티',
    category: '놀이공원',
    type: 'DISCOUNT',
    image: '/images/admin/lotteworld.png',
    searchRank: 4,
    favoriteRank: 5,
    usageRank: 4,
  },
  {
    benefitId: 5,
    benefitName: '배스킨라빈스',
    mainCategory: '푸드',
    category: '디저트',
    type: 'FREE',
    image: '/images/admin/baskin.png',
    searchRank: 5,
    favoriteRank: 4,
    usageRank: 6,
  },
  {
    benefitId: 6,
    benefitName: '파리바게뜨',
    mainCategory: '푸드',
    category: '베이커리',
    type: 'DISCOUNT',
    image: '/images/admin/paris.png',
    searchRank: 6,
    favoriteRank: 7,
    usageRank: 5,
  },
  {
    benefitId: 7,
    benefitName: 'GS더프레시',
    mainCategory: '쇼핑',
    category: '마트',
    type: 'DISCOUNT',
    image: '/images/admin/GSthefresh.png',
    searchRank: 7,
    favoriteRank: 6,
    usageRank: 7,
  },
  {
    benefitId: 8,
    benefitName: '스타벅스',
    mainCategory: '푸드',
    category: '카페',
    type: 'DISCOUNT',
    image: '/images/mock/starbucks.png',
    searchRank: 8,
    favoriteRank: 8,
    usageRank: 8,
  },
  {
    benefitId: 9,
    benefitName: '올리브영',
    mainCategory: '뷰티/건강',
    category: '화장품',
    type: 'DISCOUNT',
    image: '/images/mock/oliveyoung.png',
    searchRank: 9,
    favoriteRank: 9,
    usageRank: 9,
  },
  {
    benefitId: 10,
    benefitName: '투썸플레이스',
    mainCategory: '푸드',
    category: '카페',
    type: 'FREE',
    image: '/images/mock/twosome.png',
    searchRank: 10,
    favoriteRank: 10,
    usageRank: 10,
  },
  {
    benefitId: 11,
    benefitName: '교보문고',
    mainCategory: '교육',
    category: '도서',
    type: 'DISCOUNT',
    image: '/images/mock/kyobo.png',
    searchRank: 11,
    favoriteRank: 11,
    usageRank: 11,
  },
  {
    benefitId: 12,
    benefitName: '맥도날드',
    mainCategory: '푸드',
    category: '패스트푸드',
    type: 'DISCOUNT',
    image: '/images/mock/mcdonalds.png',
    searchRank: 12,
    favoriteRank: 12,
    usageRank: 12,
  },
  {
    benefitId: 13,
    benefitName: '버거킹',
    mainCategory: '푸드',
    category: '패스트푸드',
    type: 'DISCOUNT',
    image: '/images/mock/burgerking.png',
    searchRank: 13,
    favoriteRank: 13,
    usageRank: 13,
  },
  {
    benefitId: 14,
    benefitName: '이마트',
    mainCategory: '쇼핑',
    category: '마트',
    type: 'DISCOUNT',
    image: '/images/mock/emart.png',
    searchRank: 14,
    favoriteRank: 14,
    usageRank: 14,
  },
  {
    benefitId: 15,
    benefitName: '홈플러스',
    mainCategory: '쇼핑',
    category: '마트',
    type: 'DISCOUNT',
    image: '/images/mock/homeplus.png',
    searchRank: 15,
    favoriteRank: 15,
    usageRank: 15,
  },
  {
    benefitId: 16,
    benefitName: '쿠팡',
    mainCategory: '쇼핑',
    category: '온라인쇼핑',
    type: 'DISCOUNT',
    image: '/images/mock/coupang.png',
    searchRank: 16,
    favoriteRank: 16,
    usageRank: 16,
  },
  {
    benefitId: 17,
    benefitName: '네이버페이',
    mainCategory: '생활/편의',
    category: '결제',
    type: 'FREE',
    image: '/images/mock/naverpay.png',
    searchRank: 17,
    favoriteRank: 17,
    usageRank: 17,
  },
  {
    benefitId: 18,
    benefitName: '카카오택시',
    mainCategory: '여행/교통',
    category: '택시',
    type: 'DISCOUNT',
    image: '/images/mock/kakaotaxi.png',
    searchRank: 18,
    favoriteRank: 18,
    usageRank: 18,
  },
  {
    benefitId: 19,
    benefitName: '넷플릭스',
    mainCategory: '문화/여가',
    category: 'OTT',
    type: 'DISCOUNT',
    image: '/images/mock/netflix.png',
    searchRank: 19,
    favoriteRank: 19,
    usageRank: 19,
  },
  {
    benefitId: 20,
    benefitName: '유튜브 프리미엄',
    mainCategory: '문화/여가',
    category: 'OTT',
    type: 'DISCOUNT',
    image: '/images/mock/youtube.png',
    searchRank: 20,
    favoriteRank: 20,
    usageRank: 20,
  },
];

// 페이지네이션을 위한 헬퍼 함수
export const getMockPartnersPage = (
  page: number = 1,
  itemsPerPage: number = 8,
  category?: string,
  benefitType?: string
): {
  data: Partner[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
} => {
  let filteredPartners = [...mockPartners];

  // 필터링
  if (category && category !== '전체') {
    filteredPartners = filteredPartners.filter((partner) => partner.mainCategory === category);
  }

  if (benefitType && benefitType !== '전체') {
    filteredPartners = filteredPartners.filter((partner) => partner.type === benefitType);
  }

  // 페이지네이션
  const totalItems = filteredPartners.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = filteredPartners.slice(startIndex, endIndex);

  return {
    data,
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage,
  };
};

// 검색을 위한 헬퍼 함수
export const searchMockPartners = (
  keyword: string,
  page: number = 1,
  itemsPerPage: number = 8
): {
  data: Partner[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
} => {
  const filteredPartners = mockPartners.filter(
    (partner) =>
      partner.benefitName.toLowerCase().includes(keyword.toLowerCase()) ||
      partner.mainCategory.toLowerCase().includes(keyword.toLowerCase()) ||
      partner.category.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalItems = filteredPartners.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = filteredPartners.slice(startIndex, endIndex);

  return {
    data,
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage,
  };
};

// 통계 데이터
export const mockPartnerStatistics = {
  totalPartners: mockPartners.length,
  lastUpdated: new Date()
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/,/g, ' '),
};
