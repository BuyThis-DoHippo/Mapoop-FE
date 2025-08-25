import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';
import MapContainer from './MapContainer';
import { useEmergencyToilets } from '@/hooks/map/useMapApi';
import { requestLocationWithPermission } from '@/utils/locationUtils';

export default function SearchToiletUrgent() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);
  const [selectedToiletId, setSelectedToiletId] = useState(null);

  useEffect(() => {
    requestLocationWithPermission(
      (loc) => setCoords({ lat: loc.latitude, lng: loc.longitude }),
      () => setCoords({ lat: 37.5563, lng: 126.9236 })
    );
  }, []);

  const params = useMemo(() => {
    if (!coords) return null;
    return { lat: coords.lat, lng: coords.lng };
  }, [coords]);

  const { data: toilets = [], isLoading, isError, error } = useEmergencyToilets(params ?? {}, {
    enabled: !!params,
  });

  const displayedToilets = useMemo(() => {
    if (selectedToiletId) {
      return toilets.filter(t => t.toiletId === selectedToiletId);
    }
    return toilets;
  }, [toilets, selectedToiletId]);

  const formatOperatingHours = (toilet) => {
    if (toilet.isOpen24h) return '매일 24시간';
    if (toilet.openTime && toilet.closeTime) {
      return `매일 ${toilet.openTime.slice(0, 5)} ~ ${toilet.closeTime.slice(0, 5)}`;
    }
    return '운영시간 정보 없음';
  };
  
  const items = displayedToilets.map(t => ({
    id: t.toiletId,
    name: t.name,
    kind: t.type === 'PUBLIC' ? '공공' : '민간',
    rating: Number(t.rating ?? 0),
    tags: Array.isArray(t.tags) ? t.tags : [],
    operatingHours: formatOperatingHours(t),
    toiletId: t.toiletId,
    image: t.mainImageUrl,
  }));

  return (
    <div className="w-[1440px] mx-auto relative">
      <main className="flex">
        <section className="w-[645px] h-[1282px] pt-[40px] pl-[123px] flex flex-col">
          <div className="flex flex-col gap-[24px] flex-shrink-0">
            <h1 className="text-[32px] font-bold text-[#0B0B0B]">긴급 찾기</h1>
            <p className="text-[20px] text-[#0B0B0B]" style={{ width: '352px' }}>
              지금 사용자님의 주변에서 가장 가깝고 이용 가능한 화장실 5개를 추천해 드렸습니다.
            </p>
          </div>

          {selectedToiletId && (
            <div className="mt-[24px] flex-shrink-0">
              <button onClick={() => setSelectedToiletId(null)} className="h-[35px] px-6 rounded-full bg-main text-white text-[16px] font-bold hover:bg-main-2 transition-colors">
                전체 목록 보기
              </button>
            </div>
          )}

          <div className="mt-[40px] flex-1 flex flex-col gap-[24px] overflow-y-auto pb-10 pr-4">
            {isLoading && <p>불러오는 중…</p>}
            {isError && <p>에러: {error?.message}</p>}
            {!isLoading && !isError && items.map((t) => (
              <div
                key={t.id}
                className="w-[482px] h-[343px] flex-shrink-0 flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden cursor-pointer"
                onClick={() => navigate(`/toilet-detail/${t.toiletId}`)}
              >
                <div className="relative w-full h-[190px] overflow-hidden">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <NearbyToilet className="w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-[10px] right-[20px]">
                    <span className={`px-[22px] py-[4px] rounded-[20px] text-[14px] font-semibold text-white ${t.kind === '공공' ? 'bg-[#1FC37A]' : 'bg-[#FFB005]'}`}>
                      {t.kind}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between h-[153px] px-[24px] py-[12px]">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-[24px] font-bold text-black">{t.name}</h3>
                      <div className="flex items-center gap-[6px]"><Star className="w-[24px] h-[24px] text-[#00AEEF]" /><span className="text-[20px] font-bold text-black">{t.rating.toFixed(1)}</span></div>
                    </div>
                    <p className="mt-[4px] text-[16px] text-[#2C2C2C]">{t.operatingHours}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 overflow-hidden">
                      {(t.tags || []).slice(0, 2).map((tag, i) => (
                        <span key={i} className="flex-shrink-0 inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] px-6 py-2 text-base text-[#2C2C2C]">
                          {tag}
                        </span>
                      ))}
                      {(t.tags?.length || 0) > 2 && (
                        <span className="flex-shrink-0 inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] px-6 py-2 text-base text-[#2C2C2C]">
                          +{(t.tags.length) - 2}
                        </span>
                      )}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/toilet-detail/${t.toiletId}`); }} className="text-sm font-bold text-[#5C5C5C] flex-shrink-0 ml-4">
                      자세히 보기 →
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!isLoading && !isError && items.length === 0 && <p>주변 결과가 없습니다.</p>}
          </div>
        </section>
        <div className="w-[795px] h-[1282px]">
          <MapContainer
            coords={coords}
            selectedToiletId={selectedToiletId}
            onMarkerClick={setSelectedToiletId}
          />
        </div>
      </main>
    </div>
  );
}