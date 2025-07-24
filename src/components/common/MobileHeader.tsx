// src/components/MobileHeader.tsx
import { useState } from 'react';
import { TbMenu2 } from 'react-icons/tb';

import Modal from './Modal';

interface MobileHeaderProps {
  title?: string;
  backgroundColor?: string; // Tailwind 클래스명 등
  onMenuClick?: () => void;
}

const MobileHeader = ({
  title,
  backgroundColor = 'bg-purple06',
  onMenuClick,
}: MobileHeaderProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleMenuClick = () => {
    onMenuClick?.();
  };

  return (
    <>
      <header
        className={`w-full h-[54px] flex items-center px-4 z-[9999] border-b border-grey01 max-md:flex ${backgroundColor}`}
      >
        <div className="flex flex-row items-center h-full ">
          <button
            className="w-8 flex items-center justify-center mr-3 h-full"
            aria-label="메뉴"
            onClick={handleMenuClick}
          >
            <TbMenu2 className="w-5 h-5 text-white" />
          </button>
          <span className="text-body-2 text-black leading-none flex items-center h-full mt-[5px]">
            {title}
          </span>
        </div>
      </header>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={showLogoutModal}
        title="로그아웃"
        message="로그아웃 하시겠습니까?"
        onClose={() => setShowLogoutModal(false)}
        buttons={[
          {
            label: '아니오',
            type: 'secondary',
            onClick: () => setShowLogoutModal(false),
          },
          {
            label: '예',
            type: 'primary',
          },
        ]}
      />
    </>
  );
};

export default MobileHeader;
