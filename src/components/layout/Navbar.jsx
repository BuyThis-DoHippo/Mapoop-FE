import { NavLink, useLocation, matchPath, useNavigate } from 'react-router-dom';
import Mapoop from '@/assets/svg/Mapoop.svg?react';
import { useAuth } from '@/hooks/auth/useAuth';
import useAuthStore from '../../stores/authStore';
import { useLogout } from '../../hooks/auth/useAuthApi';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = useAuthStore(s=>s.isLogin)

  const logoutMutation = useLogout();
  const handleLogout = ()=> logoutMutation.mutate();  // 가게 검색으로 묶일 경로들 (end:false 로 prefix 매칭)
  const goToLogin = () => navigate('/login')
  
  const STORE_ROUTES = ['/search-store', '/find-toilet', '/find-toilet/urgent'];


  const isActiveBy = (patterns) =>
    patterns.some((p) => matchPath({ path: p, end: false }, location.pathname));

  const activeStore = isActiveBy(STORE_ROUTES);
  const activeReview = isActiveBy(REVIEW_ROUTES);

  const itemBase =
    'w-[75px] h-6 text-body1 text-gray-10 whitespace-nowrap hover:font-bold';

  return (
    <header className="w-full border-b border-gray-1 bg-white">
      <div className="w-full px-[125px]">
        <div className="mx-auto max-w-[1194px] h-[95px] flex items-center justify-between">
          {/* 로고 */}
          <NavLink to="/" aria-label="홈으로 이동">
            <Mapoop alt="MAPOOP 로고" className="h-[45px] block shrink-0" />
          </NavLink>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-14">
            {/* 가게 검색 */}
            <NavLink
              to="/search-store"
              aria-label="가게 검색"
              className={`${itemBase} ${activeStore ? 'font-bold' : 'font-normal'}`}
            >
              가게 검색
            </NavLink>

            {/* 화장실 리뷰 */}
            <NavLink
              to="/review-toilet"
              aria-label="화장실 리뷰"
              className={`${itemBase} ${activeReview ? 'font-bold' : 'font-normal'}`}
            >
              화장실 리뷰
            </NavLink>

            {/* 로그인 / 로그아웃 / 마이페이지 */}
            {isLogin ? (
              <div className="flex items-center gap-4">
                {/* 마이페이지 버튼 */}
                <NavLink
                  to="/mypage"
                  className="
                    inline-flex items-center justify-center
                    px-[24px] py-2.5 rounded-[10px]
                    bg-main hover:bg-main-2 text-white
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-main/40 focus-visible:ring-offset-2
                    focus-visible:ring-offset-white
                  "
                  aria-label="마이페이지"
                >
                  <span className="text-body1">마이페이지</span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                      inline-flex items-center justify-center
                      px-[24px] py-2.5 rounded-[10px]
                      border border-main text-main font-semibold
                      hover:bg-main hover:text-white
                      transition-colors duration-200
                      focus:outline-none focus-visible:ring-2
                      focus-visible:ring-main/40 focus-visible:ring-offset-2
                      focus-visible:ring-offset-white
                    "
                  aria-label="로그아웃"
                >
                  <span className="text-body1">로그아웃</span>
                </button>
              </div>
            ) : (
              /* 로그인 버튼 */
              <button
                type="button"
                onClick={goToLogin}
                className="
                  inline-flex items-center justify-center
                  px-[37px] py-2.5 rounded-[10px]
                  bg-main hover:bg-main-2 text-white
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-main/40 focus-visible:ring-offset-2
                  focus-visible:ring-offset-white
                "
                aria-label="로그인"
              >
                <span className="text-body1">로그인</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
