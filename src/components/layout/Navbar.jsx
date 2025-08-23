import { NavLink, useLocation, matchPath } from 'react-router-dom';
import Mapoop from '@/assets/svg/Mapoop.svg?react';
import { useAuth } from '@/hooks/auth/useAuth';

export default function Navbar() {
  const location = useLocation();
  const { isLogin, user, handleLogout, goToLogin } = useAuth();

  // 가게 검색으로 묶일 경로들 (end:false 로 prefix 매칭)
  const STORE_ROUTES = ['/search-store', '/find-toilet', '/find-toilet/urgent'];
  const REVIEW_ROUTES = ['/review-toilet'];

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
            <Mapoop
              alt="MAPOOP 로고"
              className="h-[45px] block shrink-0"
            />
          </NavLink>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-14">
            {/* 가게 검색 (SearchStore / SearchToilet / SearchToiletUrgent 전부 여기로 활성) */}
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

            {/* 로그인/사용자 정보 영역 */}
            {isLogin ? (
              <div className="flex items-center gap-4">
                {/* 사용자 정보 */}
                <NavLink
                  to="/mypage"
                  className="flex items-center gap-2 hover:opacity-80"
                  aria-label="마이페이지"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="프로필 이미지"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-2 rounded-full flex items-center justify-center">
                      <span className="text-body2 text-gray-5">
                        {user?.nickname?.[0] || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="text-body1 text-gray-10">
                    {user?.nickname || '사용자'}
                  </span>
                </NavLink>

                {/* 로그아웃 버튼 */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    inline-flex items-center justify-center gap-2.5
                    px-[37px] py-2.5 rounded-[10px]
                    bg-gray-2 hover:bg-gray-3 text-gray-10
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-gray-4 focus-visible:ring-offset-2
                    focus-visible:ring-offset-white
                  "
                  aria-label="로그아웃"
                >
                  <span className="text-body1">
                    로그아웃
                  </span>
                </button>
              </div>
            ) : (
              /* 로그인 버튼 */
              <button
                type="button"
                onClick={goToLogin}
                className="
                  inline-flex items-center justify-center gap-2.5
                  px-[37px] py-2.5 rounded-[10px]
                  bg-main hover:bg-main-2 text-white
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-main/40 focus-visible:ring-offset-2
                  focus-visible:ring-offset-white
                "
                aria-label="로그인"
              >
                <span className="text-body1">
                  로그인
                </span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}