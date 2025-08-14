import React from 'react';
import { NavLink } from 'react-router-dom';

// 네비게이션 바
export default function Navbar() {
  // 메뉴 공통 클래스
  const itemBase =
    'w-[75px] h-6 font-pretendard text-xl leading-normal text-[#000] whitespace-nowrap hover:font-bold';

  return (
    <header className="w-full border-b border-line bg-brand-white">
      {/* 좌우 125px */}
      <div className="w-full px-[125px]">
        {/* 내부 1194px, 높이 95px */}
        <div className="mx-auto max-w-[1194px] h-[95px] flex items-center justify-between">
          {/* 로고 */}
          <img
            src="/assets/Mapoop.svg"
            alt="MAPOOP 로고"
            className="h-[45px] block shrink-0"
          />

          {/* 메뉴 (텍스트) */}
          <nav className="flex items-center gap-[56px]">
            {/* 가게 검색 */}
            <NavLink
              to="/search-store"
              end
              aria-label="가게 검색"
              className={({ isActive }) =>
                `${itemBase} ${isActive ? 'font-bold' : 'font-normal'}`
              }
            >
              가게 검색
            </NavLink>

            {/* 화장실 리뷰 */}
            <NavLink
              to="/review-toilet"
              end
              aria-label="화장실 리뷰"
              className={({ isActive }) =>
                `${itemBase} ${isActive ? 'font-bold' : 'font-normal'}`
              }
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
