// 회원별 제휴처 이용내역 mock 데이터
export interface PartnerUsage {
  brand: string;
  amount: string;
  date: string;
}

export const mockMemberUsage: Record<number, PartnerUsage[]> = {
  1: [
    { brand: '스타벅스', amount: '2,000원', date: '2025-07-01' },
    { brand: 'GS25', amount: '1,000원', date: '2025-07-10' },
  ],
  2: [{ brand: 'CGV', amount: '3,000원', date: '2025-07-03' }],
  3: [{ brand: '이마트24', amount: '1,500원', date: '2025-07-05' }],
  4: [{ brand: '파리바게트', amount: '2,500원', date: '2025-07-08' }],
  5: [{ brand: '배스킨라빈스', amount: '1,200원', date: '2025-07-12' }],
  // ... 필요시 추가
};
import { Member } from '../apis/MemberManagementApis';

export const mockMembers: Member[] = [
  {
    id: 1,
    name: '김철수',
    email: 'chulsoo@example.com',
    phoneNumber: '010-1234-5678',
    birthday: '1990-01-15',
    userType: 'LINKED',
    grade: 'VVIP',
  },
  {
    id: 2,
    name: '이영희',
    email: 'younghee@example.com',
    phoneNumber: '010-9876-5432',
    birthday: '1992-02-20',
    userType: 'STANDARD',
    grade: 'VIP',
  },
  {
    id: 3,
    name: '박민수',
    email: 'minsu@example.com',
    phoneNumber: '010-5555-7777',
    birthday: '1995-03-10',
    userType: 'LINKED',
    grade: 'BASIC',
  },
  {
    id: 4,
    name: '정수연',
    email: 'suyeon@example.com',
    phoneNumber: '010-3333-9999',
    birthday: '1988-01-05',
    userType: 'STANDARD',
    grade: 'VVIP',
  },
  {
    id: 5,
    name: '홍길동',
    email: 'gildong@example.com',
    phoneNumber: '010-8888-1111',
    birthday: '1993-02-28',
    userType: 'LINKED',
    grade: 'VIP',
  },
  {
    id: 6,
    name: '강미영',
    email: 'miyoung@example.com',
    phoneNumber: '010-4444-2222',
    birthday: '1991-04-12',
    userType: 'STANDARD',
    grade: 'BASIC',
  },
  {
    id: 7,
    name: '윤진호',
    email: 'jinho@example.com',
    phoneNumber: '010-6666-3333',
    birthday: '1987-12-20',
    userType: 'LINKED',
    grade: 'VVIP',
  },
  {
    id: 8,
    name: '서지은',
    email: 'jieun@example.com',
    phoneNumber: '010-7777-4444',
    birthday: '1994-03-25',
    userType: 'STANDARD',
    grade: 'VIP',
  },
  {
    id: 9,
    name: '조현우',
    email: 'hyunwoo@example.com',
    phoneNumber: '010-2222-5555',
    birthday: '1996-05-08',
    userType: 'LINKED',
    grade: 'BASIC',
  },
  {
    id: 10,
    name: '임소라',
    email: 'sora@example.com',
    phoneNumber: '010-9999-6666',
    birthday: '1989-01-30',
    userType: 'STANDARD',
    grade: 'VIP',
  },
  {
    id: 11,
    name: '최준영',
    email: 'junyoung@example.com',
    phoneNumber: '010-1111-7777',
    birthday: '1992-02-14',
    userType: 'LINKED',
    grade: 'VVIP',
  },
  {
    id: 12,
    name: '한예슬',
    email: 'yeseul@example.com',
    phoneNumber: '010-8888-9999',
    birthday: '1997-04-20',
    userType: 'STANDARD',
    grade: 'BASIC',
  },
  {
    id: 13,
    name: '문태호',
    email: 'taeho@example.com',
    phoneNumber: '010-3333-8888',
    birthday: '1990-03-05',
    userType: 'LINKED',
    grade: 'VIP',
  },
  {
    id: 14,
    name: '신혜린',
    email: 'hyerin@example.com',
    phoneNumber: '010-5555-1111',
    birthday: '1986-11-15',
    userType: 'STANDARD',
    grade: 'VVIP',
  },
  {
    id: 15,
    name: '오성민',
    email: 'seongmin@example.com',
    phoneNumber: '010-7777-2222',
    birthday: '1998-05-25',
    userType: 'LINKED',
    grade: 'BASIC',
  },
  {
    id: 16,
    name: '백지수',
    email: 'jisoo@example.com',
    phoneNumber: '010-4444-3333',
    birthday: '1991-02-08',
    userType: 'STANDARD',
    grade: 'VIP',
  },
  {
    id: 17,
    name: '남경수',
    email: 'kyungsoo@example.com',
    phoneNumber: '010-6666-4444',
    birthday: '1985-10-30',
    userType: 'LINKED',
    grade: 'VVIP',
  },
  {
    id: 18,
    name: '유채원',
    email: 'chaewon@example.com',
    phoneNumber: '010-8888-5555',
    birthday: '1999-06-10',
    userType: 'STANDARD',
    grade: 'BASIC',
  },
  {
    id: 19,
    name: '권동혁',
    email: 'donghyuk@example.com',
    phoneNumber: '010-2222-6666',
    birthday: '1993-04-03',
    userType: 'LINKED',
    grade: 'VIP',
  },
  {
    id: 20,
    name: '송미나',
    email: 'mina@example.com',
    phoneNumber: '010-9999-7777',
    birthday: '1990-01-22',
    userType: 'STANDARD',
    grade: 'VVIP',
  },
];

// 페이지네이션을 위한 헬퍼 함수
export const getMockMembersPage = (
  page: number = 1,
  itemsPerPage: number = 8,
  userType?: string,
  grade?: string
): {
  data: Member[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
} => {
  let filteredMembers = [...mockMembers];

  // 필터링
  if (userType && userType !== '전체') {
    const apiUserType = userType === 'U+ 연동' ? 'LINKED' : 'STANDARD';
    filteredMembers = filteredMembers.filter((member) => member.userType === apiUserType);
  }

  if (grade && grade !== '전체') {
    filteredMembers = filteredMembers.filter((member) => member.grade === grade);
  }

  // 페이지네이션
  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = filteredMembers.slice(startIndex, endIndex);

  return {
    data,
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage,
  };
};

// 검색을 위한 헬퍼 함수
export const searchMockMembers = (
  keyword: string,
  page: number = 1,
  itemsPerPage: number = 8
): {
  data: Member[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
} => {
  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(keyword.toLowerCase()) ||
      member.email.toLowerCase().includes(keyword.toLowerCase()) ||
      member.phoneNumber.includes(keyword)
  );

  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = filteredMembers.slice(startIndex, endIndex);

  return {
    data,
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage,
  };
};

// 통계 데이터
export const mockMemberStatistics = {
  totalUsers: mockMembers.length,
  basicCount: mockMembers.filter((member) => member.grade === 'BASIC').length,
  vipCount: mockMembers.filter((member) => member.grade === 'VIP').length,
  vvipCount: mockMembers.filter((member) => member.grade === 'VVIP').length,
};
