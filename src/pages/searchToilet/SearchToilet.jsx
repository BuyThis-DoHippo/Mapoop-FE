import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Filter from '@/components/common/Filter';
import FilterIcon from '@/assets/svg/filter.svg?react';
import { nearbyToilets } from '@/mocks/mockToilets';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';

export default function SearchToilet() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const SINGLE_KIND = ['공공', '민간'];
  const SINGLE_RATING = ['4.5', '4.0', '3.5'];

  const LABEL_MAP = {
    공공: { key: 'kind', mode: 'single' },
    민간: { key: 'kind', mode: 'single' },

    4.5: { key: 'minRating', mode: 'single' },
    '4.0': { key: 'minRating', mode: 'single' },
    3.5: { key: 'minRating', mode: 'single' },

    '현재이용 가능': { key: 'use', mode: 'multi' },
    '남녀 분리': { key: 'use', mode: 'multi' },
    '가게 안 화장실': { key: 'place', mode: 'multi' },
    '24시간': { key: 'place', mode: 'multi' },
    '비데 있음': { key: 'equip', mode: 'multi' },
    '위생용품 제공': { key: 'equip', mode: 'multi' },

    깨끗한: { key: 'state', mode: 'multi' },
    깨끗함: { key: 'state', mode: 'multi' },
    칸많음: { key: 'state', mode: 'multi' },

    장애인화장실: { key: 'special', mode: 'multi' },
    기저귀교환대: { key: 'special', mode: 'multi' },
  };

  const toggleChip = ({ key, label, mode }) => {
    setSelected((prev) => {
      if (prev.includes(label)) return prev.filter((x) => x !== label);
      if (mode === 'single') {
        const group = key === 'kind' ? SINGLE_KIND : SINGLE_RATING;
        return [...prev.filter((x) => !group.includes(x)), label];
      }
      return [...prev, label];
    });
  };

  const clearAll = () => setSelected([]);
  const removeOne = (label) =>
    setSelected((prev) => prev.filter((x) => x !== label));

  const handleFilterClick = (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const text = btn.textContent?.trim();
    if (!text) return;
    if (text === '필터링 취소 X') return clearAll();
    const info = LABEL_MAP[text];
    if (info) toggleChip({ ...info, label: text });
  };

  // 필터링된 데이터
  const filteredToilets = nearbyToilets.filter((t) => {
    if (selected.length === 0) return true;

    return selected.every((label) => {
      if (label === '공공' || label === '민간') {
        return t.kind === label;
      }
      if (label === '4.5') return t.rating >= 4.5;
      if (label === '4.0') return t.rating >= 4.0;
      if (label === '3.5') return t.rating >= 3.5;
      return t.tags.includes(label);
    });
  });

  return (
    <div className="w-full">
      <Navbar active="toilet" />

      <main className="relative w-[1440px] mx-auto">
        <section className="pl-[123px] pr-[120px] pt-[76px] pb-[40px]">
          <div className="flex flex-col w-[482px] items-start">
            {/* 타이틀 + 필터 버튼 */}
            <div className="flex items-center gap-[24px]">
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
                  rounded-[10px] border-2 border-[#7C7C7C] bg-white
                  hover:bg-[#EFEFEF] hover:border-[#7C7C7C]
                  active:bg-[#EFEFEF] active:border-[#7C7C7C]
                  focus-visible:ring-2 focus-visible:ring-[#7C7C7C]
                  focus:outline-none
                "
              >
                <FilterIcon className="h-5 w-5" />
              </button>
            </div>

            {/* 선택된 칩 바 */}
            {selected.length > 0 && (
              <div className="mt-[24px] flex flex-wrap gap-[8px]">
                {selected.map((label) => (
                  <button
                    key={label}
                    onClick={() => removeOne(label)}
                    type="button"
                    className="inline-flex items-center h-[35px] px-8 rounded-[50px]
                               border border-[var(--Main-Main-2,#0085B7)]
                               bg-[var(--Main-Main3,#EBFAFF)] text-[#0085B7]
                               font-pretendard text-[16px] leading-[24px]"
                  >
                    {label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center h-[35px] px-6 rounded-[50px]
                             border border-[var(--grayscale-gray3,#9E9E9E)]
                             bg-[var(--grayscale-gray0,#EFEFEF)]
                             text-[var(--grayscale-gray3,#9E9E9E)]
                             font-pretendard text-[16px] leading-[24px]
                             hover:opacity-90"
                >
                  필터링 취소 X
                </button>
              </div>
            )}

            {/* 필터 드롭다운 (위치는 그대로) */}
            {filterOpen && (
              <div
                className="
                  absolute 
                  top-[146px] left-[218px] 
                  w-[323px] h-[663px] 
                  z-50
                "
                onClickCapture={handleFilterClick}
              >
                <Filter open selected={selected} />
              </div>
            )}

            {/* 카드 리스트 */}
            <div className="flex flex-col gap-[24px] w-full mt-[40px]">
              {filteredToilets.map((t) => (
                <div
                  key={t.id}
                  className="w-[482px] flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden relative"
                >
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <NearbyToilet className="w-full h-full object-contain" />
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

                  <div className="flex flex-col p-[24px]">
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

                    <p className="mt-[6px] text-[14px] text-[#2C2C2C] leading-[20px]">
                      매일 11:30~21:00
                    </p>

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
              {filteredToilets.length === 0 && (
                <p className="text-[16px] text-gray-500 mt-4">
                  조건에 맞는 화장실이 없습니다.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
