import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Filter from '@/components/common/Filter';
import FilterIcon from '@/assets/svg/filter.svg';

export default function SearchToilet() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 상단 네비게이션 */}
      <Navbar active="toilet" />

      {/* 페이지 본문 컨테이너 */}
      <main className="relative w-[1440px] mx-auto">
        {/* 페이지 타이틀 + 필터 버튼 영역 */}
        <section className="mt-[55px] pl-[123px] pr-[120px] relative">
          <div className="flex items-center gap-[24px]">
            {/* 페이지 타이틀 */}
            <h1 className="text-[32px] leading-[48px] font-pretendard font-bold text-[#000]">
              화장실 찾기
            </h1>

            {/* 필터 버튼 */}
            <button
              type="button"
              aria-label="필터"
              onClick={() => setFilterOpen((v) => !v)}
              className="
                h-[60px] w-[60px] shrink-0
                inline-flex items-center justify-center
                rounded-[10px] border border-[#D9D9D9] bg-white
                transition-all duration-150
                hover:bg-[#EFEFEF] hover:border-[#7C7C7C] hover:border-2
                active:bg-[#EFEFEF] active:border-[#7C7C7C] active:border-2
                focus-visible:bg-[#EFEFEF] focus-visible:border-[#7C7C7C] focus-visible:border-2
                focus:outline-none
              "
            >
              <FilterIcon className="h-5 w-5" />
            </button>
          </div>

          {/* 드롭다운 */}
          {filterOpen && (
            <div className="absolute left-[237px] top-[86px] z-50">
              <Filter open />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
