import React from 'react';
import MobileDataTable from '../../../../../components/common/MobileDataTable';
import { Partner } from '../apis/PartnershipManagementApis';

interface MobilePartnerCardProps {
  partner: Partner;
  onLinkClick?: () => void;
}

const MobilePartnerCard: React.FC<MobilePartnerCardProps> = ({ partner, onLinkClick }) => {
  return (
    <MobileDataTable
      image={partner.image}
      title={partner.benefitName}
      onLinkClick={onLinkClick}
      fields={[
        {
          label: '카테고리',
          value: partner.category === '엑티비티' ? '액티비티' : partner.category,
        },
        {
          label: '혜택 유형',
          value:
            partner.type === 'FREE' ? '증정' : partner.type === 'DISCOUNT' ? '할인' : partner.type,
        },
        { label: '검색 순위', value: partner.searchRank ?? '-' },
        { label: '관심 순위', value: partner.favoriteRank ?? '-' },
        { label: '이용 순위', value: partner.usageRank ?? '-' },
      ]}
    />
  );
};

export default MobilePartnerCard;
