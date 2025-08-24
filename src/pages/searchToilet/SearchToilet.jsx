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
  const [selectedToiletId, setSelectedToiletId] = useState(null);

  const SINGLE_KIND = ['공공', '민간'];
  const SINGLE_RATING = ['4.5', '4.0', '3.5'];

  const LABEL_MAP = {
    공공: { key: 'kind', mode: 'single' },
    민간: { key: 'kind', mode: 'single' },
    4.5: { key: 'minRating', mode: 'single' },
    '4.0': { key: 'minRating', mode: 'single' },
    3.5: { key: 'minRating', mode: 'single' },
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

  const apiFilters = useMemo(() => {
    const filters = {};
    selected.forEach(label => {
      if (label === '공공' || label === '민간') {
        filters.type = label === '공공' ? 'PUBLIC' : 'STORE';
      }
      if (['4.5', '4.0', '3.5'].includes(label)) filters.minRating = parseFloat(label);
      const tagLabels = [
        '남녀 분리', '가게 안 화장실', '24시간',
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

  const { data: markers, isLoading, error } = useMapMarkers(apiFilters);

  const displayedToilets = useMemo(() => {
    if (selectedToiletId) {
      return markers.filter(marker => marker.toiletId === selectedToiletId);
    }
    return markers;
  }, [markers, selectedToiletId]);

  const toggleChip = ({ label, mode }) => {
    setSelected((prev) => {
      if (prev.includes(label)) return prev.filter((x) => x !== label);
      if (mode === 'single') {
        const group = SINGLE_KIND.includes(label) ? SINGLE_KIND : SINGLE_RATING;
        return [...prev.filter((x) => !group.includes(x)), label];
      }
      return [...prev, label];
    });
  };

  const clearAll = () => setSelected([]);
  const removeOne = (label) => setSelected((prev) => prev.filter((x) => x !== label));

  const handleFilterClick = (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const text = btn.textContent?.trim();
    if (!text || text === '필터링 취소 X') return;
    const info = LABEL_MAP[text];
    if (info) toggleChip({ ...info, label: text });
  };

  const formatOperatingHours = (toilet) => {
    if (toilet.isOpen24h) return '매일 24시간';
    if (toilet.openTime && toilet.closeTime) {
      return `매일 ${toilet.openTime.slice(0, 5)} ~ ${toilet.closeTime.slice(0, 5)}`;
    }
    return '운영시간 정보 없음';
  };

  return (
    <div className="w-[1440px] h-[1282px] mx-auto relative">
      <main className="flex h-full">
        <section className="w-[645px] h-full pt-[40px] pl-[123px] flex flex-col">
          <div className="flex items-center gap-[24px] flex-shrink-0">
            <h1 className="text-[32px] font-bold text-[#000]">화장실 찾기</h1>
            <button type="button" aria-label="필터" onClick={() => setFilterOpen((v) => !v)} className={`h-[60px] w-[60px] shrink-0 inline-flex items-center justify-center rounded-[10px] border-2 border-[#7C7C7C] ${filterOpen ? 'bg-[#EFEFEF]' : 'bg-white'}`}>
              <FilterIcon className="w-5 h-5" />
            </button>
          </div>

          {selected.length > 0 && (
            <div className="mt-[24px] flex flex-wrap gap-[8px] flex-shrink-0">
              {selected.map((label) => <button key={label} onClick={() => removeOne(label)} type="button" className="h-[35px] px-8 rounded-full border border-[#0085B7] bg-[#EBFAFF] text-[#0085B7] text-[16px]">{label}</button>)}
              <button type="button" onClick={clearAll} className="h-[35px] px-6 rounded-full border border-[#9E9E9E] bg-[#EFEFEF] text-[#9E9E9E] text-[16px]">필터링 취소 X</button>
            </div>
          )}
          
          {selectedToiletId && (
            <div className="mt-[24px] flex-shrink-0">
              <button onClick={() => setSelectedToiletId(null)} className="h-[35px] px-6 rounded-full bg-main text-white text-[16px] font-bold hover:bg-main-2 transition-colors">
                전체 목록 보기
              </button>
            </div>
          )}

          <div className="mt-[40px] flex-1 flex flex-col gap-[24px] overflow-y-auto pb-10 pr-4">
            {isLoading && <p>화장실 정보를 불러오는 중...</p>}
            {error && <p>데이터를 불러올 수 없습니다: {error.message}</p>}
            {displayedToilets && displayedToilets.length > 0 ? (
              displayedToilets.map((toilet) => (
                <div key={toilet.toiletId} className="w-[482px] h-[343px] flex-shrink-0 flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden cursor-pointer" onClick={() => window.location.href = `/toilet-detail/${toilet.toiletId}`}>
                  <div className="relative w-full h-[190px] overflow-hidden">
                    {toilet.mainImageUrl ? <img src={toilet.mainImageUrl} alt={toilet.name} className="w-full h-full object-cover" /> : <NearbyToilet className="w-full h-full object-cover" />}
                    <div className="absolute bottom-[10px] right-[20px]"><span className={`px-[22px] py-[4px] rounded-[20px] text-[14px] font-semibold text-white ${toilet.type === 'PUBLIC' ? 'bg-[#1FC37A]' : 'bg-[#FFB005]'}`}>{toilet.type === 'PUBLIC' ? '공공' : '민간'}</span></div>
                  </div>
                  <div className="flex flex-col justify-between h-[153px] px-[24px] py-[12px]">
                    <div>
                      <div className="flex items-start justify-between"><h3 className="text-[24px] font-bold text-black">{toilet.name}</h3><div className="flex items-center gap-[6px]"><Star className="w-[24px] h-[24px] text-[#00AEEF]" /><span className="text-[20px] font-bold text-black">{toilet.rating ? toilet.rating.toFixed(1) : '0.0'}</span></div></div>
                      <p className="mt-[4px] text-[16px] text-[#2C2C2C]">{formatOperatingHours(toilet)}</p>
                    </div>
                    {/* ✨ 수정된 부분 시작 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 overflow-hidden">
                        {(toilet.tags || []).slice(0, 2).map((tag, i) => (
                          <span key={i} className="flex-shrink-0 inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] px-6 py-2 text-base text-[#2C2C2C]">
                            {tag}
                          </span>
                        ))}
                        {(toilet.tags?.length || 0) > 2 && (
                          <span className="flex-shrink-0 inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] px-6 py-2 text-base text-[#2C2C2C]">
                            +{(toilet.tags.length) - 2}
                          </span>
                        )}
                      </div>
                      <button className="text-sm font-bold text-[#5C5C5C] flex-shrink-0 ml-4">
                        자세히 보기 →
                      </button>
                    </div>
                    {/* ✨ 수정된 부분 끝 */}
                  </div>
                </div>
              ))
            ) : !isLoading && !error && <p>조건에 맞는 화장실이 없습니다.</p>}
          </div>
        </section>
        <div className="w-[795px] h-full">
          <MapContainer filters={apiFilters} selectedToiletId={selectedToiletId} onMarkerClick={setSelectedToiletId} />
        </div>
      </main>
      {filterOpen && (
        <div className="absolute top-[106px] left-[218px] z-50" onClickCapture={handleFilterClick}>
          <Filter open selected={selected} onClear={clearAll} />
        </div>
      )}
    </div>
  );
}