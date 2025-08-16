import { NavLink, useLocation, matchPath } from 'react-router-dom';
import Mapoop from '@/assets/svg/Mapoop.svg?react';

export default function Navbar() {
  const location = useLocation();

  // 가게 검색으로 묶일 경로들 (end:false 로 prefix 매칭)
  const STORE_ROUTES = ['/search-store', '/find-toilet', '/find-toilet/urgent'];
  const REVIEW_ROUTES = ['/review-toilet'];

  const isActiveBy = (patterns) =>
    patterns.some((p) => matchPath({ path: p, end: false }, location.pathname));

  const activeStore = isActiveBy(STORE_ROUTES);
  const activeReview = isActiveBy(REVIEW_ROUTES);

  const itemBase =
    'w-[75px] h-6 font-pretendard text-xl leading-normal text-[#000] whitespace-nowrap hover:font-bold';

  return (
    <header className="w-full border-b border-line bg-brand-white">
      <div className="w-full px-[125px]">
        <div className="mx-auto max-w-[1194px] h-[95px] flex items-center justify-between">
          {/* 로고 */}
          <Mapoop
            alt="MAPOOP 로고"
            className="h-[45px] block shrink-0"
          />

          {/* 네비게이션 */}
          <nav className="flex items-center gap-[56px]">
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

            {/* 로그인 버튼 */}
            <button
              type="button"
              aria-label="로그인"
              className="
                inline-flex items-center justify-center gap-2.5
                px-[37px] py-2.5 rounded-[10px]
                bg-brand-main hover:bg-brand-2 text-white
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-brand-main/40 focus-visible:ring-offset-2
                focus-visible:ring-offset-brand-white
              "
            >
              <span className="font-pretendard font-normal text-xl leading-normal">
                로그인
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
