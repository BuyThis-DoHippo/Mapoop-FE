import { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import Filter from '@/components/common/Filter';

// 아이콘들
import FilterIcon from '@/assets/svg/filter.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';
import ArrowLeft from '@/assets/svg/arrowleft.svg?react';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';

// API hooks
import { useSearchResults } from '@/hooks/store/useStoreApi';

// 칩 스타일 정의
const chipSelectedClass =
  'inline-flex items-center px-4 h-[32px] rounded-full border border-main-2 bg-main-1 text-main-2 text-body2 shadow-sm transition-colors hover:bg-main-2 hover:text-white';

const clearClass =
  'inline-flex items-center justify-center h-[32px] px-4 rounded-full border border-gray-3 bg-gray-0 text-gray-4 text-body2 transition-colors hover:bg-gray-1 hover:text-gray-6';

export default function SearchStore() {
  const [filterOpen, setFilterOpen] = useState(false); // 필터 열림 여부
  const [selected, setSelected] = useState([]); // 선택된 필터 칩들
  const [keyword, setKeyword] = useState(''); // 검색어
  const [currentIndex, setCurrentIndex] = useState(0); // 카드 페이지네이션 인덱스

  // 평점 옵션 (정확히 이 값들만 minRating으로 인정)
  const ratingOptions = ['4.5', '4.0', '3.5'];

  // API 호출 (검색 결과)
  const { data, isLoading, error } = useSearchResults(
    {
      keyword: keyword || undefined,
      minRating: selected.find((x) => ratingOptions.includes(x)) || undefined,
      type: selected.includes('공공')
        ? 'PUBLIC'
        : selected.includes('민간')
          ? 'STORE'
          : undefined,
      tags: selected.filter(
        (x) => !['공공', '민간', '4.5', '4.0', '3.5'].includes(x)
      ),
    },
    { enabled: true }
  );

  const toilets = data?.data?.toilets || [];

  // 단일 선택 그룹 관리용
  const SINGLE_KIND = ['공공', '민간'];
  const SINGLE_RATING = ['4.5', '4.0', '3.5'];

  // 칩 라벨 매핑
  const LABEL_MAP = {
    공공: { key: 'kind', mode: 'single' },
    민간: { key: 'kind', mode: 'single' },
    4.5: { key: 'minRating', mode: 'single' },
    '4.0': { key: 'minRating', mode: 'single' },
    3.5: { key: 'minRating', mode: 'single' },
    현재이용가능: { key: 'use', mode: 'multi' },
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

  const clearAll = () => setSelected([]); // 전체 해제
  const removeOne = (label) =>
    setSelected((prev) => prev.filter((x) => x !== label));

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

  const handleFilterClick = (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const text = btn.textContent?.trim();
    if (!text) return;
    if (text === '필터링 취소 X') return clearAll();
    const info = LABEL_MAP[text];
    if (info) toggleChip({ ...info, label: text });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 4));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(toilets.length - 4, prev + 4));
  };

  return (
    <div className="w-full">
      <main className="w-[1440px] mx-auto">
        {/* 검색창 + 필터 버튼 */}
        <section className="mt-[90px] pl-[198px] pr-[197px]">
          <div className="inline-flex items-center gap-6 relative">
            <SearchBar variant="store" onSearch={(q) => setKeyword(q)} />

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

            {filterOpen && (
              <div
                className="absolute top-full right-0 z-50 mt-2"
                onClickCapture={handleFilterClick}
              >
                <Filter open selected={selected} />
              </div>
            )}
          </div>

          {/* 선택된 필터 칩 바 */}
          {selected.length > 0 && (
            <div className="mt-6 w-full">
              <span className="block mb-2 text-body2 text-gray-10">
                필터링 결과
              </span>
              <div className="flex flex-wrap gap-2">
                {selected.map((label) => (
                  <button
                    key={label}
                    onClick={() => removeOne(label)}
                    type="button"
                    className={chipSelectedClass}
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
        </section>

        {/* 카드 리스트 */}
        <section className="pl-[123px] pr-[120px] mb-0 mt-[100px]">
          <div className="flex flex-col items-start gap-11 w-full bg-white">
            <h2 className="text-heading3-regular text-gray-10">
              지금 주변에 있는 가장 가까운 화장실
            </h2>

            {isLoading && <p>로딩중...</p>}
            {error && <p>에러 발생: {error.message}</p>}
            {!isLoading && toilets.length === 0 && (
              <p className="text-gray-6 text-body1 mt-8">
                검색 결과가 없습니다.
              </p>
            )}

            {/* 카드 컨테이너 */}
            <div className="w-[1193px] flex items-center gap-6 mb-[229px]">
              <button
                type="button"
                aria-label="이전 목록"
                className="w-6 h-6 disabled:opacity-30"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {toilets.slice(currentIndex, currentIndex + 4).map((t) => (
                <div
                  key={t.toiletId}
                  className="flex-shrink-0 h-[393px] w-[256px]"
                >
                  <div
                    className="relative rounded-[10px] overflow-hidden"
                    style={{ width: '256px', height: '256px' }}
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
                      {t.type === 'PUBLIC' ? '공공' : '민간'}
                    </span>
                  </div>

                  {/* 가게명 + 평점 */}
                  <div className="mt-4">
                    <div className="flex items-start justify-between">
                      <p
                        className="text-heading3-bold text-gray-10 line-clamp-2"
                        style={{ maxWidth: '200px' }}
                        title={t.name}
                      >
                        {t.name}
                      </p>

                      <div className="flex items-center gap-4">
                        <Star className="w-6 h-6" />
                        <span className="w-[31px] h-6 text-body1-bold text-gray-10 text-right">
                          {t.rating !== null && t.rating !== undefined
                            ? t.rating.toFixed(1)
                            : '-'}
                        </span>
                      </div>
                    </div>

                    {/* 태그 칩 */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {t.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center justify-center rounded-full bg-gray-0 
                                     px-4 py-1 h-[30px] text-body2 text-gray-8 whitespace-nowrap 
                                     overflow-hidden text-ellipsis"
                          title={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                aria-label="다음 목록"
                className="w-6 h-6 disabled:opacity-30"
                onClick={handleNext}
                disabled={currentIndex + 4 >= toilets.length}
              >
                <Arrow className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
