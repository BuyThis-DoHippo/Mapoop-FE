import { useState, useMemo } from 'react';
import Filter from '@/components/common/Filter';
import FilterIcon from '@/assets/svg/filter.svg?react';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';
import MapContainer from './MapContainer';
import { useMapMarkers } from '@/hooks/map/useMapApi';

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

    깨끗함: { key: 'state', mode: 'multi' },
    칸많음: { key: 'state', mode: 'multi' },

    장애인화장실: { key: 'special', mode: 'multi' },
    기저귀교환대: { key: 'special', mode: 'multi' },
  };

  // 필터를 API 파라미터로 변환
  const apiFilters = useMemo(() => {
    const filters = {};
    
    selected.forEach(label => {
      if (label === '공공' || label === '민간') {
        filters.type = label === '공공' ? 'PUBLIC' : 'PRIVATE';
      }
      if (label === '4.5') filters.minRating = 4.5;
      if (label === '4.0') filters.minRating = 4.0;
      if (label === '3.5') filters.minRating = 3.5;
      
      // 기본 시설, 상태, 특수 시설 등의 태그들을 배열로 관리
      const tagLabels = [
        '현재이용 가능', '남녀 분리', '가게 안 화장실', '24시간', 
        '비데 있음', '위생용품 제공', '깨끗함', '칸많음', 
        '장애인화장실', '기저귀교환대'
      ];
      
      if (tagLabels.includes(label)) {
        if (!filters.tags) filters.tags = [];
        filters.tags.push(label);
      }
    });
    
    return filters;
  }, [selected]);

  // API로 데이터 조회
  const { data: markers, isLoading, error } = useMapMarkers(apiFilters);

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

  return (
    <div className="w-[1440px] mx-auto relative">
      <main className="flex">
        {/* 왼쪽 카드 리스트 */}
        <section className="w-[645px] h-[1282px] pt-[40px] pl-[123px] flex flex-col">
          {/* 제목 + 필터 버튼 */}
          <div className="flex items-center gap-[24px]">
            <h1 className="text-[32px] leading-[48px] font-pretendard font-bold text-[#000]">
              화장실 찾기
            </h1>
            <button
              type="button"
              aria-label="필터"
              onClick={() => setFilterOpen((v) => !v)}
              className={`
                h-[60px] w-[60px] shrink-0 inline-flex items-center justify-center
                rounded-[10px] border-2 border-[#7C7C7C]
                ${filterOpen ? 'bg-[#EFEFEF]' : 'bg-white'}
                transition-all duration-150
                focus:outline-none
              `}
            >
              <FilterIcon className="w-5 h-5" />
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
                             border border-[#0085B7]
                             bg-[#EBFAFF] text-[#0085B7]
                             font-pretendard text-[16px] leading-[24px]"
                >
                  {label}
                </button>
              ))}

              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center justify-center h-[35px] px-6 rounded-[50px]
                           border border-[#9E9E9E]
                           bg-[#EFEFEF] text-[#9E9E9E]
                           font-pretendard text-[16px] leading-[24px]
                           hover:opacity-90"
              >
                필터링 취소 X
              </button>
            </div>
          )}

          {/* 카드 리스트 */}
          <div className="mt-[40px] flex-1 flex flex-col gap-[24px] overflow-y-auto pb-10">
            {/* 로딩 상태 */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">화장실 정보를 불러오는 중...</p>
                </div>
              </div>
            )}

            {/* 에러 상태 */}
            {error && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-red-600 mb-2">데이터를 불러올 수 없습니다</p>
                  <p className="text-sm text-gray-600">{error.message}</p>
                </div>
              </div>
            )}

            {/* 화장실 카드들 */}
            {markers && markers.length > 0 ? (
              markers.map((toilet) => (
                <div
                  key={toilet.id}
                  className="w-[482px] h-[343px] flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    // 화장실 상세 페이지로 이동
                    window.location.href = `/toilet-detail/${toilet.toiletId}`;
                  }}
                >
                  {/* 이미지 영역 (190px) */}
                  <div className="relative w-full h-[190px] overflow-hidden">
                    {toilet.image ? (
                      <img 
                        src={toilet.image} 
                        alt={toilet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <NearbyToilet className="w-full h-full object-cover" />
                    )}
                    <div className="absolute bottom-[10px] right-[20px]">
                      <span
                        className={[
                          'px-[22px] py-[4px] rounded-[20px] text-[14px] font-semibold text-white flex items-center',
                          toilet.type === 'PUBLIC' ? 'bg-[#1FC37A]' : 'bg-[#FFB005]',
                        ].join(' ')}
                      >
                        {toilet.type === 'PUBLIC' ? '공공' : '민간'}
                      </span>
                    </div>
                  </div>

                  {/* 정보 영역 (153px) */}
                  <div className="flex flex-col justify-between h-[153px] px-[24px] py-[12px]">
                    {/* 텍스트 블록 */}
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-pretendard text-[24px] font-bold text-black leading-[36px]">
                          {toilet.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <Star className="w-[24px] h-[24px] text-[#00AEEF]" />
                          <span className="font-pretendard text-[20px] font-bold text-black leading-[30px]">
                            {toilet.rating ? toilet.rating.toFixed(1) : '0.0'}
                          </span>
                        </div>
                      </div>
                      <p className="mt-[4px] text-[16px] leading-[24px] font-pretendard font-normal text-[#2C2C2C]">
                        {toilet.operatingHours || '운영시간 정보 없음'}
                      </p>
                    </div>

                    {/* 칩들 */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-[16px]">
                        {toilet.tags && toilet.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF]
                                       px-[24px] py-[8px]
                                       text-[16px] leading-[24px] font-pretendard font-normal text-[#2C2C2C]"
                          >
                            {tag}
                          </span>
                        ))}
                        {toilet.tags && toilet.tags.length > 2 && (
                          <span className="inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF]
                                           px-[24px] py-[8px]
                                           text-[16px] leading-[24px] font-pretendard font-normal text-[#2C2C2C]">
                            +{toilet.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <button 
                        className="text-[14px] font-bold leading-[20px] text-[#5C5C5C] font-pretendard hover:text-[#444] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/toilet-detail/${toilet.toiletId}`;
                        }}
                      >
                        자세히 보기 →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : !isLoading && !error ? (
              <p className="text-[16px] text-gray-500 mt-4 text-center py-20">
                조건에 맞는 화장실이 없습니다.
              </p>
            ) : null}
          </div>
        </section>

        {/* 오른쪽 지도 */}
        <div className="w-[795px] h-[1282px]">
          <MapContainer filters={apiFilters} />
        </div>
      </main>

      {/* 필터 드롭다운 */}
      {filterOpen && (
        <div
          className="absolute"
          style={{
            top: '106px',
            left: '218px',
            width: '323px',
            height: '663px',
            zIndex: 50,
          }}
          onClickCapture={handleFilterClick}
        >
          <Filter open selected={selected} />
        </div>
      )}
    </div>
  );
}