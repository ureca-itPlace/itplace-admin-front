import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../../../../components/common/AdminModal';
import {
  Partner,
  getBenefitDetail,
  updateBenefit,
  BenefitDetail,
  TierBenefit,
} from '../apis/PartnershipManagementApis';

interface EditingSectionProps {
  label: string;
  value: string | TierBenefit[];
  onChange: (v: string | TierBenefit[]) => void;
  placeholder: string;
  isEditing: boolean;
  className?: string;
  isDropdown?: boolean;
  options?: string[];
  isTierBenefits?: boolean;
}

const EditingSection: React.FC<EditingSectionProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isEditing,
  className = '',
  isDropdown = false,
  options = [],
  isTierBenefits = false,
}) => (
  <div className="flex mb-8 ml-[16px] max-md:flex-col">
    <h5 className="text-title-5 max-md:text-title-5 text-black mb-4 w-[100px] flex-shrink-0 max-md:w-full max-md:mb-4">
      {label}
    </h5>
    <div className="pl-[24px] flex-1 max-md:pl-0">
      <div className="space-y-3">
        <div>
          {isTierBenefits && Array.isArray(value) ? (
            <div className="space-y-2">
              {value.map((tier, index) => (
                <div key={index} className="mb-4">
                  <div className="text-body-0 max-md:text-body-3 text-black mb-2">{tier.grade}</div>
                  <div className="text-body-0 max-md:text-body-3 text-black">{tier.context}</div>
                </div>
              ))}
            </div>
          ) : isEditing ? (
            isDropdown ? (
              <select
                value={typeof value === 'string' ? value : ''}
                onChange={(e) => onChange(e.target.value)}
                className={`text-body-0 max-md:text-body-3 text-black bg-grey01 border border-grey02 rounded-[10px] px-2 py-3 w-full  ${className}`}
              >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                value={typeof value === 'string' ? value : ''}
                onChange={(e) => onChange(e.target.value)}
                className={`text-body-0 max-md:text-body-3 text-grey05 bg-grey01 border border-grey02 rounded-[10px] px-2 py-1 w-full h-[150px] resize-none ${className}`}
                placeholder={placeholder}
              />
            )
          ) : (
            <div className="text-body-0 max-md:text-body-3 text-grey05 whitespace-pre-line">
              {typeof value === 'string' ? value : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

interface PartnerDetailModalProps {
  isOpen: boolean;
  partner: Partner | null;
  onClose: () => void;
}

const PartnerDetailModal: React.FC<PartnerDetailModalProps> = ({ isOpen, partner, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [benefitDetail, setBenefitDetail] = useState<BenefitDetail | null>(null);
  const [editData, setEditData] = useState<{
    benefitContent: TierBenefit[];
    benefitInfo: string;
    usageMethod: string;
  }>({
    benefitContent: [],
    benefitInfo: '',
    usageMethod: '',
  });

  // 제공횟수 옵션들
  const frequencyOptions = ['월 1회', '일 1회', '제한없음', '최초 1회'];

  // 혜택 상세 정보 로드
  const loadBenefitDetail = useCallback(async () => {
    if (!partner) return;

    setIsLoading(true);
    try {
      const response = await getBenefitDetail(partner.benefitId);
      if (response.data) {
        setBenefitDetail(response.data);
        setEditData({
          benefitContent: response.data.tierBenefits || [],
          benefitInfo: response.data.benefitLimit || '',
          usageMethod: response.data.manual || '',
        });
      }
    } catch {
      setEditData({
        benefitContent: [],
        benefitInfo: '',
        usageMethod: '',
      });
    } finally {
      setIsLoading(false);
    }
  }, [partner]);

  useEffect(() => {
    if (isOpen && partner) {
      loadBenefitDetail();
    }
  }, [isOpen, partner, loadBenefitDetail]);

  if (!partner) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!partner) return;

    setIsLoading(true);
    try {
      const apiData = {
        benefitLimit: editData.benefitInfo,
        manual: editData.usageMethod,
      };
      await updateBenefit(partner.benefitId, apiData);
      setIsEditing(false);
      await loadBenefitDetail();
    } catch {
      // 에러 발생 시 무시
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 원래 데이터로 복원 (BenefitDetailModal과 동일하게)
    if (benefitDetail) {
      setEditData({
        benefitContent: benefitDetail.tierBenefits || [],
        benefitInfo: benefitDetail.benefitLimit || '',
        usageMethod: benefitDetail.manual || '',
      });
    }
  };

  const handleInputChange = (field: keyof typeof editData, value: string | TierBenefit[]) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="제휴처 상세정보">
      <div className="relative h-full flex flex-col">
        {/* 내용 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">로딩 중...</div>
            </div>
          ) : (
            <>
              {/* 브랜드 정보 */}
              <div className="flex items-center justify-between mb-[28px]">
                <div className="flex items-center ml-[16px]">
                  <div>
                    <h4 className="text-title-2 text-black mb-1 max-md:text-title-4">
                      {partner.benefitName}
                    </h4>
                    <p className="text-body-0 text-grey05 mt-1 max-md:text-body-2">
                      {benefitDetail?.description || '혜택 설명이 없습니다.'}
                    </p>
                  </div>
                </div>
                <div className="w-[120px] h-[120px] bg-white flex items-center justify-center">
                  <img
                    src={partner.image}
                    alt={`${partner.benefitName} 로고`}
                    className="w-[120px] h-[120px] object-contain"
                  />
                </div>
              </div>

              {/*제공 혜택 섹션*/}
              <EditingSection
                label="제공 횟수"
                value={editData.benefitInfo}
                onChange={(v) => handleInputChange('benefitInfo', v)}
                placeholder="제공 횟수를 선택하세요"
                isEditing={isEditing}
                isDropdown={true}
                options={frequencyOptions}
              />
              {/*혜택 내용 섹션*/}
              <EditingSection
                label="혜택 내용"
                value={editData.benefitContent}
                onChange={(v) => handleInputChange('benefitContent', v)}
                placeholder="혜택 내용을 입력하세요"
                isEditing={isEditing}
                isTierBenefits={true}
              />
              {/*이용방법 섹션*/}
              <EditingSection
                label="이용 방법"
                value={editData.usageMethod}
                onChange={(v) => handleInputChange('usageMethod', v)}
                placeholder="이용 방법을 입력하세요"
                isEditing={isEditing}
              />
            </>
          )}
        </div>

        {/* 하단 고정 버튼 */}
        <div className="flex justify-center py-2 mt-2 gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="w-[218px] max-md:w-1/3 h-[52px]  bg-white text-grey05 rounded-[30px] text-body-0 font-medium border border-grey03 max-md:text-body-2"
              >
                취소하기
              </button>
              <button
                onClick={handleSave}
                className="w-[218px] max-md:w-1/3 h-[52px] bg-purple04 text-white rounded-[30px] text-body-0 font-medium max-md:text-body-2"
              >
                저장하기
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="w-[218px] max-md:w-1/2 h-[52px] bg-purple04 text-white rounded-[30px] text-body-0 font-medium max-md:text-body-2"
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PartnerDetailModal;
