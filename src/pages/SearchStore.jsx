import { useState, useRef, useLayoutEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/common/SearchBar';
import Filter from '@/components/common/Filter';
import { nearbyToilets } from '@/mocks/mockToilets';

// 카드 레이아웃 수치
const cardWidths = [257, 256, 256, 256];
const nameFrames = [
  { w: 83, h: 29 },
  { w: 130, h: 29 },
  { w: 172, h: 58 },
  { w: 136, h: 58 },
];

export default function SearchStore() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  // 단일 선택 그룹 라벨
  const SINGLE_KIND = ['공공', '민간'];
  const SINGLE_RATING = ['4.5', '4.0', '3.5', '4.5+', '4.0+', '3.5+'];

  // 라벨 → 그룹/모드 매핑
  const LABEL_MAP = {
    공공: { key: 'kind', mode: 'single' },
    민간: { key: 'kind', mode: 'single' },

    4.5: { key: 'minRating', mode: 'single' },
    '4.0': { key: 'minRating', mode: 'single' },
    3.5: { key: 'minRating', mode: 'single' },
    '4.5+': { key: 'minRating', mode: 'single' },
    '4.0+': { key: 'minRating', mode: 'single' },
    '3.5+': { key: 'minRating', mode: 'single' },

    '현재이용 가능': { key: 'use', mode: 'multi' },
    '남녀 분리': { key: 'use', mode: 'multi' },
    '가게 안 화장실': { key: 'place', mode: 'multi' },
    '24시간': { key: 'place', mode: 'multi' },
    '비데 있음': { key: 'equip', mode: 'multi' },
    '위생용품 제공': { key: 'equip', mode: 'multi' },

    깨끗함: { key: 'state', mode: 'multi' },
    칸많음: { key: 'state', mode: 'multi' },

    장애인화장실: { key: 'special', mode: 'multi' },
    기저귀교환대: { key: 'special', mode: 'multi' },
  };

  // 선택 칩(파란 칩)
  const chipSelectedClass =
    'inline-flex items-center px-8 h-[35px] rounded-[50px] ' +
    'border border-[var(--Main-Main-2,#0085B7)] ' +
    'bg-[var(--Main-Main3,#EBFAFF)] text-[#0085B7] ' +
    'font-pretendard text-[16px] leading-[24px] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FCBE6]';

  // 취소 칩(X)
  const clearClass =
    'inline-flex items-center justify-center h-[35px] px-6 rounded-[50px] ' +
    'border border-[var(--grayscale-gray3,#9E9E9E)] ' +
    'bg-[var(--grayscale-gray0,#EFEFEF)] ' +
    'text-[var(--grayscale-gray3,#9E9E9E)] ' +
    'font-pretendard text-[16px] leading-[24px] ' +
    'hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0D0D0]';

  // 전체/개별 해제
  const clearAll = () => setSelected([]);
  const removeOne = (label) =>
    setSelected((prev) => prev.filter((x) => x !== label));

  // 칩 토글(단일/다중 규칙)
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

  // 팝오버 내부 버튼 클릭 위임
  const handleFilterClick = (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const text = btn.textContent?.trim();
    if (!text) return;
    if (text === '필터링 취소 X') return clearAll();
    const info = LABEL_MAP[text];
    if (info) toggleChip({ ...info, label: text });
  };

  // 검색줄 실제 높이 기반으로 칩/필터 top 계산
  const searchRowRef = useRef(null);
  const [chipTop, setChipTop] = useState(84);
  useLayoutEffect(() => {
    const calc = () => {
      const h = Math.round(
        searchRowRef.current?.getBoundingClientRect().height || 60
      );
      setChipTop(h + 24);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      <main className="w-[1440px] mx-auto">
        {/* 상단: 검색창 + 필터 버튼 */}
        <section className="mt-[90px] pl-[198px] pr-[197px]">
          <div className="relative">
            <div
              className="inline-flex items-center gap-[24px]"
              ref={searchRowRef}
            >
              <SearchBar
                variant="store"
                onSearch={(q) => console.log('search:', q)}
              />
              <button
                type="button"
                aria-label="필터"
                onClick={() => setFilterOpen((v) => !v)}
                className="
                  h-[60px] w-[60px] shrink-0 inline-flex items-center justify-center
                  rounded-[10px] border border-[#D9D9D9] bg-white
                  transition-all duration-150
                  hover:bg-[#EFEFEF] hover:border-[#7C7C7C] hover:border-2
                  active:bg-[#EFEFEF] active:border-[#7C7C7C] active:border-2
                  focus-visible:bg-[#EFEFEF] focus-visible:border-[#7C7C7C] focus-visible:border-2
                  focus:outline-none
                "
              >
                <img src="/assets/filter.svg" alt="필터" className="h-5 w-5" />
              </button>
            </div>

            {/* 선택 칩 바 */}
            {selected.length > 0 && (
              <div
                className="absolute left-0 w-[961px] flex items-start gap-[32px]"
                style={{ top: chipTop }}
              >
                <span className="w-[92px] h-[35px] flex items-center flex-shrink-0 font-pretendard text-[16px] font-normal leading-[24px] text-black">
                  필터링 결과
                </span>

                <div className="flex flex-wrap content-start items-center gap-2">
                  {selected.map((label) => (
                    <button
                      key={label}
                      onClick={() => removeOne(label)}
                      type="button"
                      className={chipSelectedClass}
                      title={label}
                    >
                      <span>{label}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={clearAll}
                    className={clearClass}
                    aria-label="필터링 취소"
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            {/* 필터 팝오버 */}
            {filterOpen && (
              <div
                className="absolute right-0 z-50"
                style={{ top: chipTop }}
                onClickCapture={handleFilterClick}
              >
                <Filter open selected={selected} />
              </div>
            )}
          </div>
        </section>
        {/* 카드 리스트 */}
        <section className="pl-[123px] pr-[120px] mb-0 mt-[153px]">
          <div className="flex flex-col items-start gap-[44px] w-full bg-white">
            <h2 className="text-[24px] leading-[36px] font-pretendard font-normal text-[#000]">
              지금 주변에 있는 가장 가까운 화장실
            </h2>

            <div className="w-[1193px] flex items-center gap-[24px] mb-[229px]">
              <button
                type="button"
                aria-label="이전 목록"
                className="w-6 h-6 flex-shrink-0"
              >
                <img src="/assets/arrowleft.svg" alt="" className="w-6 h-6" />
              </button>

              {nearbyToilets.map((t, idx) => {
                const cardW = cardWidths[idx];
                const imgW = cardW;
                const nameBox = nameFrames[idx];
                const isTwo = nameBox.h >= 58;
                const extra = Math.max(0, 58 - nameBox.h);

                return (
                  <div
                    key={t.id}
                    className="flex-shrink-0 h-[393px]"
                    style={{ width: `${cardW}px` }}
                  >
                    <div
                      className="relative rounded-[10px] overflow-hidden"
                      style={{ width: `${imgW}px`, height: `${imgW}px` }}
                    >
                      <img
                        src="/assets/NearbyToilet.svg"
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={[
                          'absolute right-[12px] bottom-[12px] h-[28px] px-[12px] rounded-full',
                          'text-[12px] font-semibold text-white flex items-center',
                          t.kind === '공공' ? 'bg-[#1FC37A]' : 'bg-[#FFC83A]',
                        ].join(' ')}
                      >
                        {t.kind}
                      </span>
                    </div>

                    <div className="mt-[16px]">
                      <div className="flex items-start justify-between">
                        <p
                          className="font-pretendard text-black text-[24px] font-bold leading-[29px]"
                          style={{
                            width: `${nameBox.w}px`,
                            height: `${nameBox.h}px`,
                            display: isTwo ? '-webkit-box' : 'block',
                            WebkitLineClamp: isTwo ? 2 : undefined,
                            WebkitBoxOrient: isTwo ? 'vertical' : undefined,
                            overflow: 'hidden',
                            whiteSpace: isTwo ? undefined : 'nowrap',
                            textOverflow: isTwo ? undefined : 'ellipsis',
                          }}
                          title={t.name}
                        >
                          {t.name}
                        </p>

                        <div className="flex items-center gap-[8px]">
                          <img
                            src="/assets/star.svg"
                            alt=""
                            aria-hidden
                            className="w-[24px] h-[24px]"
                          />
                          <span className="w-[31px] h-[24px] font-pretendard text-black text-[20px] font-bold leading-[24px] text-right">
                            {t.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div style={{ height: `${extra}px` }} />

                      <div className="mt-[12px] flex flex-wrap items-center gap-[16px]">
                        {t.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-pretendard inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] w-[95px] h-[35px] text-[16px] font-normal text-center text-[var(--grayscale-gray8,#2C2C2C)] whitespace-nowrap overflow-hidden text-ellipsis"
                            title={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                aria-label="다음 목록"
                className="w-6 h-6 flex-shrink-0"
              >
                <img src="/assets/arrow.svg" alt="" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
