import { useState, useRef, useLayoutEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import Filter from '@/components/common/Filter';
import { mockStore } from '../../mocks/mockStore';

// SVG import
import FilterIcon from '@/assets/svg/filter.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';
import ArrowLeft from '@/assets/svg/arrowleft.svg?react';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';

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
    '가게 밖 화장실': { key: 'place', mode: 'multi' },
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
    'border border-main-2 ' +
    'bg-main-3 text-main-2 ' +
    'text-body2 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FCBE6]';

  // 취소 칩(X)
  const clearClass =
    'inline-flex items-center justify-center h-[35px] px-6 rounded-[50px] ' +
    'border border-gray-3 ' +
    'bg-gray-0 ' +
    'text-gray-3 ' +
    'text-body2 ' +
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

  // 필터링 로직
  const filteredStore = mockStore.filter((t) => {
    if (selected.length === 0) return true;
    return selected.every((label) => {
      if (label === '공공' || label === '민간') {
        return t.kind === label;
      }
      if (label === '4.5') return t.rating >= 4.5;
      if (label === '4.0') return t.rating >= 4.0;
      if (label === '3.5') return t.rating >= 3.5;
      if (label === '4.5+') return t.rating > 4.5;
      if (label === '4.0+') return t.rating > 4.0;
      if (label === '3.5+') return t.rating > 3.5;
      return t.tags.includes(label);
    });
  });

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

      <main className="w-[1440px] mx-auto">
        {/* 상단: 검색창 + 필터 버튼 */}
        <section className="mt-[90px] pl-[198px] pr-[197px]">
          <div className="relative">
            <div
              className="inline-flex items-center gap-6"
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
                className={`
    h-[60px] w-[60px] shrink-0 inline-flex items-center justify-center
    rounded-[10px] border-2 border-gray-4
    ${filterOpen ? 'bg-gray-0' : 'bg-white'}
    transition-all duration-150
    focus:outline-none
  `}
              >
                <FilterIcon className="w-5 h-5" />
              </button>
            </div>

            {/* 선택 칩 바 */}
            {selected.length > 0 && (
              <div
                className="absolute left-0 w-[961px] flex items-start gap-8"
                style={{ top: chipTop }}
              >
                <span className="w-[92px] h-[35px] flex items-center flex-shrink-0 text-body2 text-gray-10">
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

            {filterOpen && (
              <div
                className="absolute right-0 z-50"
                style={{ top: chipTop - 28 }}
                onClickCapture={handleFilterClick}
              >
                <Filter open selected={selected} />
              </div>
            )}
          </div>
        </section>

        {/* 카드 리스트 */}
        <section className="pl-[123px] pr-[120px] mb-0 mt-[153px]">
          <div className="flex flex-col items-start gap-11 w-full bg-white">
            <h2 className="text-heading3-regular text-gray-10">
              지금 주변에 있는 가장 가까운 화장실
            </h2>

            <div className="w-[1193px] flex items-center gap-6 mb-[229px]">
              <button type="button" aria-label="이전 목록" className="w-6 h-6">
                <ArrowLeft className="w-6 h-6" />
              </button>

              {/* 필터링된 카드 리스트 */}
              {filteredStore.map((t, idx) => {
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
                    {t.mainImageUrl ? (
                      <img
                        src={t.mainImageUrl}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <NearbyToilet className="w-full h-full object-cover" />
                    )}
                    <span
                      className={[
                        'absolute right-3 bottom-3 h-7 px-3 rounded-full',
                        'text-[12px] font-semibold text-white flex items-center',
                        t.type === 'PUBLIC' ? 'bg-[#1FC37A]' : 'bg-[#FFC83A]',
                      ].join(' ')}

                    >
                      <NearbyToilet className="w-full h-full object-cover" />
                      <span
                        className={[
                          'absolute right-3 bottom-3 h-7 px-3 rounded-full',
                          'text-[12px] font-semibold text-white flex items-center',
                          t.kind === '공공' ? 'bg-[#1FC37A]' : 'bg-[#FFC83A]',
                        ].join(' ')}
                      >
                        {t.kind}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-start justify-between">
                        <p
                          className="text-heading3-bold text-gray-10"
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

                        <div className="flex items-center gap-2">
                          <Star className="w-6 h-6" />
                          <span className="w-[31px] h-6 text-body1-bold text-gray-10 text-right">
                            {t.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div style={{ height: `${extra}px` }} />

                      {/* 태그 칩 */}
                      <div
                        className={`flex flex-wrap items-center gap-4`}
                        style={{ marginTop: isTwo ? '32px' : '16px' }}
                      >
                        {t.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center justify-center rounded-[50px] bg-gray-0
                 px-6 py-2 h-[35px]
                 text-body2 text-gray-8
                 whitespace-nowrap overflow-hidden text-ellipsis"
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

              <button type="button" aria-label="다음 목록" className="w-6 h-6">
                <Arrow className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}