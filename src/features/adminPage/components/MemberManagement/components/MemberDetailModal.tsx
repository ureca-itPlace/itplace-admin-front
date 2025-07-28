import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/common/AdminModal';
import { Member, getUserBenefitUsage, MembershipUsage } from '../apis/MemberManagementApis';

interface MemberDetailModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
}

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ isOpen, member, onClose }) => {
  const [membershipUsage, setMembershipUsage] = useState<MembershipUsage[]>([]);
  const [membershipId, setMembershipId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 회원 상세 정보 로드
  useEffect(() => {
    const loadMemberDetail = async () => {
      if (!member || !isOpen) return;

      setIsLoading(true);
      try {
        const response = await getUserBenefitUsage(member.id);
        setMembershipUsage(response.data.membershipUsage);
        setMembershipId(response.data.membershipId);
      } catch (error) {
        console.error('회원 상세 정보 로드 실패:', error);
        setMembershipUsage([]);
        setMembershipId(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberDetail();
  }, [member, isOpen]);
  if (!member) return null;

  // 등급 변환 함수
  const getGradeDisplay = (grade: 'VVIP' | 'VIP' | 'BASIC' | null) => {
    if (grade === 'BASIC') return '우수';
    return grade || '-';
  };

  // 회원 구분 변환 함수
  const getUserTypeDisplay = (userType: 'LINKED' | 'STANDARD') => {
    return userType === 'LINKED' ? 'U+ 연동' : '일반';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="회원 상세정보">
      <div className="pt-[38px]">
        {/* 회원 정보 */}
        <div className="mb-6 ml-[40px]">
          <h4 className="text-title-2 max-md:text-title-5 mb-2">{member.name}</h4>
          <p className="text-body-0 max-md:text-body-3 text-grey05">
            {getGradeDisplay(member.grade)} | {getUserTypeDisplay(member.userType)} | 멤버십 번호:{' '}
            <span className="text-body-0-bold">{membershipId || '없음'}</span>
          </p>
        </div>

        {/* 제휴처 이용 내역 테이블 */}
        <div
          className="bg-grey01 rounded-[12px] overflow-hidden ml-[40px] mr-[40px]"
          style={{ height: 'calc(100% - 120px)' }}
        >
          <div className="bg-grey02 pl-[42px] max-md:pl-6 py-4 border-b border-grey02">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 text-left text-body-0 max-md:text-body-2 text-grey05">
                브랜드
              </div>
              <div className="col-span-4 text-center max-md:text-left text-body-0 max-md:text-body-2 text-grey05">
                할인 금액
              </div>
              <div className="col-span-4 text-center max-md:text-left text-body-0 max-md:text-body-2 text-grey05">
                날짜
              </div>
            </div>
          </div>
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 48px)' }}>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-grey03">로딩 중...</div>
              </div>
            ) : membershipUsage.length > 0 ? (
              membershipUsage.map((usage, index) => (
                <div key={index} className="pl-[42px] max-md:pl-6 py-4 border-b border-white">
                  <div className="grid grid-cols-12 gap-8 max-md:gap-4">
                    <div className="col-span-4 text-body-0 max-md:text-body-4 text-black truncate">
                      {usage.benefitName}
                    </div>
                    <div className="col-span-4 text-body-0 max-md:text-body-4 text-black text-center max-md:text-left">
                      {usage.discountAmount.toLocaleString()}원
                    </div>
                    <div className="col-span-4 text-body-0 max-md:text-body-4 text-black text-center max-md:text-left ">
                      {usage.usedAt}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-grey03">혜택 이용 내역이 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MemberDetailModal;
