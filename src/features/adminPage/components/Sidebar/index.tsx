// src/features/adminPage/components/Sidebar/index.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLayoutDashboard } from 'react-icons/tb';
import { TbUser } from 'react-icons/tb';
import { TbBuildingStore } from 'react-icons/tb';
import { TbSocial } from 'react-icons/tb';
import { TbLogout2 } from 'react-icons/tb';
import { useAuth } from '../../../../hooks/useAuth';
import Modal from '../../../../components/common/Modal';

interface SidebarProps {
  onTabChange: (tabId: string) => void;
}

const Sidebar = ({ onTabChange }: SidebarProps) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: '대시 보드', icon: TbLayoutDashboard },
    { id: 'users', label: '사용자 관리', icon: TbUser },
    { id: 'partners', label: '제휴 관리', icon: TbBuildingStore },
    { id: 'ai', label: 'AI 분석', icon: TbSocial },
    { id: 'logout', label: '로그아웃', icon: TbLogout2 },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'logout') {
      // 로그아웃 모달 표시
      setShowLogoutModal(true);
      return;
    }

    setSelectedTab(tabId);
    onTabChange(tabId);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <aside
        className="bg-purple06 text-white flex flex-col"
        style={{ width: 370, height: 891, borderRadius: 18 }}
      >
        <div
          className="text-title-1"
          style={{ marginTop: 24, marginLeft: 34, textShadow: '0px 0px 5px rgba(255,255,255,0.6)' }}
        >
          IT: PLACE
        </div>

        <nav className="mt-14" style={{ paddingLeft: 12, paddingRight: 12 }}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 mb-4 rounded-[10px] text-body-0 transition-all duration-200 flex items-center ${
                  selectedTab === item.id
                    ? 'bg-white text-purple06'
                    : 'bg-transparent text-white hover:bg-white/10'
                }`}
                style={{ height: 60 }}
              >
                <IconComponent size={20} />
                <span style={{ marginLeft: 23 }}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={showLogoutModal}
        title="로그아웃"
        message="정말 로그아웃 하시겠습니까?"
        onClose={handleLogoutCancel}
        buttons={[
          {
            label: '취소',
            type: 'secondary',
            onClick: handleLogoutCancel,
          },
          {
            label: '로그아웃',
            type: 'primary',
            onClick: handleLogoutConfirm,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
