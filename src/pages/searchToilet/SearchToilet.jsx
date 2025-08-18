import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Filter from '@/components/common/Filter';
import FilterIcon from '@/assets/svg/filter.svg?react';
import { nearbyToilets } from '@/mocks/mockToilets';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';

export default function SearchToilet() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="w-full">
      <Navbar active="toilet" />

      <main className="relative w-[1440px] mx-auto">
        {/* 사이드바 */}
        <section className="pl-[123px] pr-[120px] pt-[76px] pb-[40px]">
          <div className="flex flex-col w-[482px] items-start">
            {/* 타이틀 + 필터 버튼 */}
            <div className="flex items-center gap-[24px] relative">
              <h1 className="text-[32px] leading-[48px] font-pretendard font-bold text-[#000]">
                화장실 찾기
              </h1>
              <button
                type="button"
                aria-label="필터"
                onClick={() => setFilterOpen((v) => !v)}
                className="
                  h-[60px] w-[60px] shrink-0
                  inline-flex items-center justify-center
                  rounded-[10px] border border-[#D9D9D9] bg-white
                  hover:bg-[#EFEFEF] hover:border-[#7C7C7C]
                  active:bg-[#EFEFEF] active:border-[#7C7C7C]
                  focus-visible:ring-2 focus-visible:ring-[#7C7C7C]
                  focus:outline-none
                "
              >
                <FilterIcon className="h-5 w-5" />
              </button>
            </div>

            {/* 필터 드롭다운 (Frame 137 절대 위치 기준) */}
            {filterOpen && (
              <div
                className="
                  absolute 
                  top-[146px] left-[218px] 
                  w-[323px] h-[663px] 
                  z-50
                "
              >
                <Filter open />
              </div>
            )}

            {/* 카드 리스트 */}
            <div className="flex flex-col gap-[24px] w-full mt-[40px]">
              {nearbyToilets.map((t) => (
                <div
                  key={t.id}
                  className="w-[482px] flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden relative"
                >
                  {/* 이미지 */}
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <NearbyToilet className="w-full h-full object-contain" />
                    {/* 상태 배지 */}
                    <div className="absolute top-[135px] right-[20px]">
                      <span
                        className={[
                          'px-[22px] py-[4px] rounded-[20px] text-[14px] font-semibold text-white flex items-center',
                          t.kind === '공공' ? 'bg-[#1FC37A]' : 'bg-[#FFB005]',
                        ].join(' ')}
                      >
                        {t.kind}
                      </span>
                    </div>
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="flex flex-col p-[24px]">
                    {/* 이름 + 평점 */}
                    <div className="flex items-start justify-between">
                      <h3 className="font-pretendard text-[20px] font-bold text-black leading-[29px]">
                        {t.name}
                      </h3>
                      <div className="flex items-center gap-[6px]">
                        <Star className="w-[20px] h-[20px] text-[#00AEEF]" />
                        <span className="font-pretendard text-[16px] font-bold text-black">
                          {t.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* 운영시간 */}
                    <p className="mt-[6px] text-[14px] text-[#2C2C2C] leading-[20px]">
                      매일 11:30~21:00
                    </p>

                    {/* 태그 + 자세히 보기 */}
                    <div className="flex items-center justify-between mt-[20px]">
                      <div className="flex flex-wrap gap-[8px]">
                        {t.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] px-[12px] h-[30px] text-[14px] text-[#2C2C2C]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-[16px] font-bold leading-[24px] text-[#5C5C5C] font-pretendard hover:text-[#444] transition-colors">
                        자세히 보기 →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
