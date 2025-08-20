import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/mypage/Sidebar';

const MyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-[125px] py-[65px]">
        <div className="flex gap-[54px]">
          {/* 사이드바 */}
          <Sidebar />
          
          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;