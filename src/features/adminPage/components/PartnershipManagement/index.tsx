import { useState, useEffect, useCallback, useMemo } from 'react';
import { TbRefresh, TbExternalLink, TbChevronUp, TbChevronDown } from 'react-icons/tb';
import { debounce } from 'lodash';
import StatisticsCard from '../../../../components/common/StatisticsCard';
import SearchBar from '../../../../components/common/SearchBar';
import FilterDropdown from '../../../../components/common/FilterDropdown';
import DataTable from '../../../../components/common/DataTable';
import FilterButtonGroup from '../../../../components/common/FilterButtonGroup';
import FilterDropdownMenu from '../../../../components/common/FilterDropdownMenu';
import MobilePartnerCard from './components/MobilePartnerCard';
import BenefitFilterToggle from '../../../../components/common/BenefitFilterToggle';
import ActionButton from '../../../../components/common/ActionButton';
import Pagination from '../../../../components/common/Pagination';
import PartnerDetailModal from './components/PartnerDetailModal';
import {
  Partner,
  getAllPartners,
  searchBenefits,
  getTotalBenefitCount,
} from './apis/PartnershipManagementApis';
import MobileStatisticsCard from '../../../../components/common/MobileStatisticsCard';

const PartnershipManagement = () => {
  // 어떤 모바일 필터 드롭다운이 열려있는지: 'category' | 'benefitType' | null
  const [openMobileFilter, setOpenMobileFilter] = useState<
    null | 'category' | 'benefitType' | 'sort'
  >(null);
  // BenefitFilterToggle 상태
  const [benefitToggle, setBenefitToggle] = useState('default' as 'default' | 'vipkok');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBenefitType, setSelectedBenefitType] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  // 정렬 상태
  const [sortField, setSortField] = useState<'searchRank' | 'favoriteRank' | 'usageRank' | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 8;

  // 페이지네이션 정보 상태
  const [totalItems, setTotalItems] = useState(0);

  // 통계 데이터 상태
  const [totalPartners, setTotalPartners] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');

  // 제휴처 데이터 로드 함수
  const loadPartners = useCallback(
    async (
      page: number = 1,
      sortBy?: 'searchRank' | 'favoriteRank' | 'usageRank' | null,
      direction?: 'asc' | 'desc'
    ) => {
      setIsLoading(true);
      try {
        // mainCategory 매핑
        const mainCategory = benefitToggle === 'vipkok' ? 'VIP_COCK' : 'BASIC_BENEFIT';
        // API sortBy 변환: searchRank → search, favoriteRank → favorite, usageRank → usage
        const sortFieldMap = {
          searchRank: 'search',
          favoriteRank: 'favorite',
          usageRank: 'usage',
        } as const;
        const sortFieldToSend =
          (sortBy && sortFieldMap[sortBy as keyof typeof sortFieldMap]) ||
          (sortField && sortFieldMap[sortField]) ||
          'id';
        const sortDirectionToSend = direction || sortDirection || 'asc';

        const response = await getAllPartners(
          mainCategory,
          selectedCategory || undefined,
          selectedBenefitType as 'FREE' | 'DISCOUNT' | undefined,
          undefined, // keyword
          page - 1, // API는 0부터 시작
          itemsPerPage,
          sortFieldToSend,
          sortDirectionToSend
        );

        if (response.data) {
          setPartners(response.data.content);
          setTotalItems(response.data.totalElements);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error('제휴처 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCategory, selectedBenefitType, benefitToggle, sortField, sortDirection]
  );

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        // 전체 제휴처 수 조회
        const countResponse = await getTotalBenefitCount();
        if (countResponse.data) {
          setTotalPartners(countResponse.data);
          // ISO 문자열에서 'T'를 공백으로 치환하여 날짜와 시간 분리
          const isoString = new Date().toISOString();
          setLastUpdated(isoString.replace('T', ' ').split('.')[0]);
        }

        // 첫 페이지 데이터 로드
        await loadPartners(1);
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [loadPartners]);

  // 검색 API 호출 함수
  const searchPartners = useCallback(
    async (
      searchQuery: string,
      page: number = 1,
      sortBy?: 'searchRank' | 'favoriteRank' | 'usageRank' | null,
      direction?: 'asc' | 'desc'
    ) => {
      setIsLoading(true);
      try {
        // API sortBy 변환: searchRank → search, favoriteRank → favorite, usageRank → usage
        const sortFieldMap = {
          searchRank: 'search',
          favoriteRank: 'favorite',
          usageRank: 'usage',
        } as const;
        const sortFieldToSend =
          (sortBy && sortFieldMap[sortBy as keyof typeof sortFieldMap]) ||
          (sortField && sortFieldMap[sortField]) ||
          'id';
        const sortDirectionToSend = direction || sortDirection || 'asc';
        const response = await searchBenefits(
          searchQuery,
          page - 1, // API는 0부터 시작
          itemsPerPage,
          sortFieldToSend,
          sortDirectionToSend
        );

        if (response.data) {
          setPartners(response.data.content);
          setTotalItems(response.data.totalElements);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error('검색 API 호출 실패:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [sortField, sortDirection]
  );

  // 디바운스된 검색 함수
  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string) => {
        setDebouncedSearchTerm(searchQuery);
        searchPartners(searchQuery);
      }, 500),
    [searchPartners]
  );

  // 검색어 변경 시 디바운스 적용
  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedSearch(searchTerm);
    } else {
      // 검색어가 비어있으면 디바운스 취소하고 일반 모드로 복귀
      debouncedSearch.cancel();
      setDebouncedSearchTerm('');
      loadPartners(1);
    }

    // cleanup 함수로 디바운스 취소
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch, loadPartners]);

  // 검색어 변경 시 페이지 초기화
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 필터 핸들러
  const handleCategoryFilter = (category: string) => {
    if (category === '전체') {
      setSelectedCategory(null);
    } else {
      // '액티비티' 선택 시 API에는 '엑티비티'로 전달
      const apiCategory = category === '액티비티' ? '엑티비티' : category;
      setSelectedCategory(selectedCategory === apiCategory ? null : apiCategory);
    }
    setCurrentPage(1);
  };

  const handleBenefitTypeFilter = (benefitType: string) => {
    if (benefitType === '전체') {
      setSelectedBenefitType(null);
    } else {
      // 한글 → API 값 변환
      const apiValue =
        benefitType === '증정' ? 'FREE' : benefitType === '할인' ? 'DISCOUNT' : benefitType;
      setSelectedBenefitType(selectedBenefitType === apiValue ? null : apiValue);
    }
    setCurrentPage(1);
  };

  // 필터 변경 시 데이터 다시 로드
  useEffect(() => {
    if (!debouncedSearchTerm) {
      loadPartners(1);
    }
  }, [selectedCategory, selectedBenefitType, debouncedSearchTerm, loadPartners]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    if (debouncedSearchTerm) {
      searchPartners(debouncedSearchTerm, pageNumber);
    } else {
      loadPartners(pageNumber);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      // 전체 제휴처 수 조회
      const countResponse = await getTotalBenefitCount();
      if (countResponse.data) {
        setTotalPartners(countResponse.data);
        const isoString = new Date().toISOString();
        setLastUpdated(isoString.replace('T', ' ').split('.')[0]);
      }
      setSearchTerm('');
      setDebouncedSearchTerm('');
      setCurrentPage(1);
      await loadPartners(1);
      console.log('데이터 새로고침 완료');
    } catch (error) {
      console.error('데이터 새로고침 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePartnerDetailClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedPartner(null);
  };

  const handleFilterReset = () => {
    setSelectedCategory(null);
    setSelectedBenefitType(null);
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  // 상태 렌더링 함수
  const renderBenefitType = (benefitType: string) => {
    let label = '';
    if (benefitType === 'FREE') label = '증정';
    else if (benefitType === 'DISCOUNT') label = '할인';
    else label = benefitType;
    return <span className="text-body-2 font-medium">{label}</span>;
  };

  // 정렬 아이콘 렌더링 함수
  const renderSortIcon = (field: 'searchRank' | 'favoriteRank' | 'usageRank') => {
    if (sortField !== field) {
      return (
        <div className="flex flex-col ml-2">
          <TbChevronUp size={16} className="text-grey05" />
          <TbChevronDown size={16} className="text-grey05 -mt-1" />
        </div>
      );
    }
    if (sortDirection === 'asc') {
      return (
        <div className="flex flex-col ml-2">
          <TbChevronUp size={16} className="text-orange04" />
          <TbChevronDown size={16} className="text-grey05 -mt-1" />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col ml-2">
          <TbChevronUp size={16} className="text-grey05" />
          <TbChevronDown size={16} className="text-orange04 -mt-1" />
        </div>
      );
    }
  };

  // 정렬 핸들러
  // 정렬 핸들러 (필드, 방향 모두 받도록 수정)
  const handleSort = (
    field: 'searchRank' | 'favoriteRank' | 'usageRank',
    direction: 'asc' | 'desc' = 'asc'
  ) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1);
    if (debouncedSearchTerm) {
      searchPartners(debouncedSearchTerm, 1, field, direction);
    } else {
      loadPartners(1, field, direction);
    }
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      key: 'image',
      label: '로고',
      width: '80px',
      align: 'center' as const,
      render: (value: unknown) => (
        <div className="flex items-center justify-center">
          <img
            src={value as string}
            alt="브랜드 로고"
            className="w-10 h-10 object-contain rounded-lg"
          />
        </div>
      ),
    },
    { key: 'benefitName', label: '제휴처명', width: '240px' },
    {
      key: 'category',
      label: '카테고리',
      width: '120px',
      render: (value: unknown) => {
        const strValue = value as string;
        const label = strValue === '엑티비티' ? '액티비티' : strValue;
        return <span className="text-body-2 font-medium">{label}</span>;
      },
    },
    {
      key: 'type',
      label: '혜택 유형',
      width: '120px',
      render: (value: unknown) => renderBenefitType(value as string),
    },
    {
      key: 'searchRank',
      label: '검색 순위',
      width: '120px',
      sortable: true,
      headerRender: () => (
        <button
          onClick={() => handleSort('searchRank')}
          className={`flex items-center justify-start transition-colors duration-150 ${
            sortField === 'searchRank' ? 'text-orange04 rounded-[4px]' : 'text-grey05'
          }`}
        >
          <span>검색 순위</span>
          {renderSortIcon('searchRank')}
        </button>
      ),
      render: (value: unknown) => (
        <span className="text-caption-1 font-medium text-left block">{value as number}위</span>
      ),
    },
    {
      key: 'favoriteRank',
      label: '즐겨찾기 순위',
      width: '120px',
      sortable: true,
      headerRender: () => (
        <button
          onClick={() => handleSort('favoriteRank')}
          className={`flex items-center justify-start transition-colors duration-150 ${
            sortField === 'favoriteRank' ? ' text-orange04 rounded-[4px]' : 'text-grey05'
          }`}
        >
          <span>즐겨찾기 순위</span>
          {renderSortIcon('favoriteRank')}
        </button>
      ),
      render: (value: unknown) => (
        <span className="text-caption-1 font-medium text-left block">{value as number}위</span>
      ),
    },
    {
      key: 'usageRank',
      label: '이용 순위',
      width: '120px',
      sortable: true,
      headerRender: () => (
        <button
          onClick={() => handleSort('usageRank')}
          className={`flex items-center justify-start transition-colors duration-150 ${
            sortField === 'usageRank' ? ' text-orange04 rounded-[4px]' : 'text-grey05'
          }`}
        >
          <span>이용 순위</span>
          {renderSortIcon('usageRank')}
        </button>
      ),
      render: (value: unknown) => (
        <span className="text-caption-1 font-medium text-left block">{value as number}위</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '60px',
      render: (_value: unknown, row: Record<string, unknown>) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePartnerDetailClick(row as unknown as Partner);
          }}
          className="flex items-center justify-center text-black hover:text-grey03 transition-colors duration-150"
        >
          <TbExternalLink size={18} />
        </button>
      ),
    },
  ];

  // 필터 그룹 정의
  const filterGroups = [
    {
      title: '카테고리',
      options: [
        { label: '전체', value: '전체' },
        { label: 'APP/기기', value: 'APP/기기' },
        { label: '액티비티', value: '액티비티' },
        { label: '뷰티/건강', value: '뷰티/건강' },
        { label: '쇼핑', value: '쇼핑' },
        { label: '생활/편의', value: '생활/편의' },
        { label: '푸드', value: '푸드' },
        { label: '문화/여가', value: '문화/여가' },
        { label: '교육', value: '교육' },
        { label: '여행/교통', value: '여행/교통' },
      ],
      selectedValue: selectedCategory === '엑티비티' ? '액티비티' : selectedCategory,
      onSelect: handleCategoryFilter,
    },
    {
      title: '혜택 유형',
      options: [
        { label: '전체', value: '전체' },
        { label: '할인', value: '할인' },
        { label: '증정', value: '증정' },
      ],
      selectedValue:
        selectedBenefitType === 'FREE'
          ? '증정'
          : selectedBenefitType === 'DISCOUNT'
            ? '할인'
            : selectedBenefitType,
      onSelect: handleBenefitTypeFilter,
    },
  ];

  return (
    <div className="pl-[28px] pt-[32px] pr-[28px] h-full max-md:p-0">
      <h2 className="text-title-3 mb-[40px] max-md:hidden">제휴 관리</h2>
      {/* 모바일에서만 통계 카드 노출 (좌우 여백 없이 꽉차게) */}
      <div className="max-md:block hidden mb-4 max-md:mx-[-20px]">
        <MobileStatisticsCard
          title="전체 제휴처 수"
          onRefresh={handleRefresh}
          totalNumbers={totalPartners}
          unit="개"
        />
      </div>
      {/* 상단 정보 섹션 */}
      <div className="flex mb-[28px] max-md:hidden" style={{ width: 1410 }}>
        <StatisticsCard
          title="제휴처 수"
          value={totalPartners}
          subtitle="개"
          borderColor="border-l-purple04"
          valueColor="text-purple04"
          subtitleColor="text-black"
          width={344}
          height={87}
        />

        <div className="ml-auto">
          <StatisticsCard
            title="최근 업데이트 날짜"
            value={lastUpdated}
            borderColor="border-l-orange04"
            valueColor="text-orange04"
            width={1046}
            height={87}
          />
        </div>
      </div>

      {/* 검색 및 액션 버튼 섹션 */}
      <div className="flex max-md:flex-col items-center justify-between mb-[28px] w-[1410px] max-md:w-full">
        <BenefitFilterToggle value={benefitToggle} onChange={setBenefitToggle} />
        <div className="flex items-center gap-3 max-md:w-full max-md:mt-3">
          <SearchBar
            placeholder="제휴처 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={() => setSearchTerm('')}
            widthClass="w-[344px] max-md:w-full"
            heightClass="h-[50px] max-md:h-[40px]"
          />
          <div className="max-md:hidden flex gap-3 filter-dropdown">
            <FilterDropdown
              isOpen={showFilterDropdown}
              onToggle={() => setShowFilterDropdown(!showFilterDropdown)}
              filterGroups={filterGroups}
              onReset={handleFilterReset}
              hasActiveFilters={selectedCategory !== null || selectedBenefitType !== null}
            />
            <ActionButton
              icon={<TbRefresh size={20} />}
              onClick={handleRefresh}
              variant="primary"
              size={50}
            />
          </div>
        </div>
        {/* 모바일에서만 필터 버튼 그룹 */}
        <div className="w-full max-md:flex hidden relative mt-3">
          <FilterButtonGroup
            buttons={[
              {
                label: '카테고리',
                onClick: () =>
                  setOpenMobileFilter(openMobileFilter === 'category' ? null : 'category'),
                active: selectedCategory !== null,
              },
              {
                label: '혜택 유형',
                onClick: () =>
                  setOpenMobileFilter(openMobileFilter === 'benefitType' ? null : 'benefitType'),
                active: selectedBenefitType !== null,
              },
              {
                label: '순위 정렬',
                onClick: () => setOpenMobileFilter(openMobileFilter === 'sort' ? null : 'sort'),
                active: sortField !== null,
              },
            ]}
          />
          {/* 드롭다운 메뉴: 버튼 아래에 조건부 렌더 */}
          {openMobileFilter === 'category' && (
            <FilterDropdownMenu
              options={filterGroups[0].options}
              selectedValue={filterGroups[0].selectedValue as string | null}
              onSelect={filterGroups[0].onSelect}
              onClose={() => setOpenMobileFilter(null)}
              className="left-0 top-[52px] w-1/2"
            />
          )}
          {openMobileFilter === 'benefitType' && (
            <FilterDropdownMenu
              options={filterGroups[1].options}
              selectedValue={filterGroups[1].selectedValue as string | null}
              onSelect={filterGroups[1].onSelect}
              onClose={() => setOpenMobileFilter(null)}
              className="left-1/2 -translate-x-1/2 top-[52px] w-1/2"
            />
          )}
          {openMobileFilter === 'sort' && (
            <div className="absolute right-0 top-[52px] w-1/2 bg-white border border-grey02 rounded-lg shadow-lg z-50 text-body-3">
              <div className="border-b border-grey02">
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${!sortField ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    setSortField(null);
                    setSortDirection('asc');
                    setCurrentPage(1);
                    if (debouncedSearchTerm) {
                      searchPartners(debouncedSearchTerm, 1, null, 'asc');
                    } else {
                      loadPartners(1, null, 'asc');
                    }
                  }}
                >
                  초기화
                </button>
              </div>
              <div className="border-b border-grey02">
                <div className="px-4 py-2 text-body-2 text-black">검색 순위</div>
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${sortField === 'searchRank' && sortDirection === 'asc' ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    handleSort('searchRank', 'asc');
                  }}
                >
                  오름차순
                </button>
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${sortField === 'searchRank' && sortDirection === 'desc' ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    handleSort('searchRank', 'desc');
                  }}
                >
                  내림차순
                </button>
              </div>
              <div className="border-b border-grey02">
                <div className="px-4 py-2 text-body-2 text-black">즐겨찾기 순위</div>
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${sortField === 'favoriteRank' && sortDirection === 'asc' ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    handleSort('favoriteRank', 'asc');
                  }}
                >
                  오름차순
                </button>
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${sortField === 'favoriteRank' && sortDirection === 'desc' ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    handleSort('favoriteRank', 'desc');
                  }}
                >
                  내림차순
                </button>
              </div>
              <div className="border-b border-grey02">
                <div className="px-4 py-2 text-body-2 text-black">이용 순위</div>
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${sortField === 'usageRank' && sortDirection === 'asc' ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    handleSort('usageRank', 'asc');
                  }}
                >
                  오름차순
                </button>
                <button
                  className={`w-full py-2 px-4 text-left text-body-3 ${sortField === 'usageRank' && sortDirection === 'desc' ? 'bg-purple01 text-purple04' : 'text-grey07'}`}
                  onClick={() => {
                    setOpenMobileFilter(null);
                    handleSort('usageRank', 'desc');
                  }}
                >
                  내림차순
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 모바일 카드형 리스트 */}
      <div className="max-md:block hidden">
        {partners.map((item) => (
          <MobilePartnerCard
            key={item.benefitId}
            partner={item}
            onLinkClick={() => handlePartnerDetailClick(item)}
          />
        ))}
        {/* 모바일 페이지네이션 */}
        <div className="max-md:block hidden mt-4">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            width="w-[100%] max-md:w-auto"
          />
        </div>
      </div>

      {/* PC 테이블 */}
      <div className="max-md:hidden">
        <DataTable
          data={partners as unknown as Record<string, unknown>[]}
          columns={columns}
          onRowClick={(row) => handlePartnerDetailClick(row as unknown as Partner)}
          width={1410}
          height={516}
          emptyMessage="제휴처가 없습니다."
        />
        {/* PC 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          width="w-[1410px]"
        />
      </div>

      {/* 제휴처 상세정보 모달 */}
      <PartnerDetailModal
        isOpen={showDetailModal}
        partner={selectedPartner}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PartnershipManagement;
