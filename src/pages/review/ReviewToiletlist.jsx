import { useState, useMemo } from 'react';
import Filter from '@/components/common/Filter';
import FilterIcon from '@/assets/svg/filter.svg?react';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';

import { useReviewToilets } from '@/hooks/review/useReviewApiList';

export default function ReviewToiletList() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  // API 호출
  const { data, isLoading, error } = useReviewToilets(
    {
      keyword: undefined,
      minRating:
        selected.find((x) => ['4.5', '4.0', '3.5'].includes(x)) || undefined,
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

  const toiletsRaw = data?.data?.toilets || [];

  // 별점 내림차순 + 같으면 랜덤
  const toilets = useMemo(() => {
    const shuffled = [...toiletsRaw].sort(() => Math.random() - 0.5);
    return shuffled.sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      if (ratingA === ratingB) return 0;
      return ratingB - ratingA;
    });
  }, [toiletsRaw]);

  return (
    <div className="w-full">
      <main className="w-[1440px] mx-auto">
        {/* 제목 + 필터 */}
        <section className="mt-[60px] flex flex-col gap-[44px] px-[123px]">
          <div className="flex items-center justify-between">
            <h2 className="text-heading3-regular text-gray-10">
              리뷰 좋은 화장실
            </h2>

            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                className="h-[60px] w-[60px] flex items-center justify-center
                           rounded-[10px] border-2 border-gray-4 bg-white hover:bg-gray-0"
              >
                <FilterIcon className="w-5 h-5" />
              </button>

              {filterOpen && (
                <div
                  className="absolute top-full right-0 mt-2 z-50"
                  onClickCapture={(e) => {
                    const text = e.target.textContent?.trim();
                    if (!text) return;
                    if (text === '필터링 취소 X') {
                      setSelected([]);
                      return;
                    }
                    setSelected((prev) =>
                      prev.includes(text)
                        ? prev.filter((x) => x !== text)
                        : [...prev, text]
                    );
                  }}
                >
                  <Filter
                    open
                    selected={selected}
                    onClear={() => setSelected([])}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 카드 리스트 */}
        <section className="px-[123px] mt-[44px]">
          {isLoading && <p>로딩중...</p>}
          {error && <p>에러 발생: {error.message}</p>}
          {!isLoading && toilets.length === 0 && (
            <p className="text-gray-6 text-body1 mt-8">검색 결과가 없습니다.</p>
          )}

          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              gap-x-6 gap-y-[44px]
            "
          >
            {toilets.map((t) => (
              <div key={t.toiletId} className="h-[393px] w-[256px] mx-auto">
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

                <div className="mt-4">
                  <div className="flex items-start justify-between">
                    <p
                      className="text-heading3-bold text-gray-10 truncate"
                      style={{ maxWidth: '200px' }}
                      title={t.name}
                    >
                      {t.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      <span className="text-body1-bold text-gray-10">
                        {t.rating !== null && t.rating !== undefined
                          ? t.rating.toFixed(1)
                          : '-'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {t.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center rounded-full bg-gray-0 
                                   px-3 py-1 h-[30px] text-body2 text-gray-8 whitespace-nowrap 
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
          </div>

          {/* 하단 여백 */}
          <div className="mt-[44px] mb-[150px]" />
        </section>
      </main>
    </div>
  );
}
