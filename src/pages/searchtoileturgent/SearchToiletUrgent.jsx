import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';
import MapContainer from './MapContainer';

import { useNearbyToilets } from '@/hooks/map/useMapApi';
import { requestLocationWithPermission } from '@/utils/locationUtils';

export default function SearchToiletUrgent() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    requestLocationWithPermission(
      (loc) => setCoords({ lat: loc.latitude, lng: loc.longitude }),
      () => setCoords({ lat: 37.5563, lng: 126.9236 }) // 홍대입구 fallback
    );
  }, []);

  const params = useMemo(() => {
    if (!coords) return null;
    return { lat: coords.lat, lng: coords.lng, limit: 5 };
  }, [coords]);

  const { data: toilets = [], isLoading, isError, error } = useNearbyToilets(params ?? {}, {
    enabled: !!params,
  });

  const items = (toilets || []).map(t => ({
    id: t.id,
    name: t.name,
    kind: t.type === 'PUBLIC' ? '공공' : '민간',
    rating: Number(t.avgRating ?? t.rating ?? 0),
    tags: Array.isArray(t.tags) ? t.tags : [],
    operatingHours: t.operatingHours || '운영시간 정보 없음',
    toiletId: t.id,
    image: t.thumbnailUrl,
  }));

  return (
    <div className="w-[1440px] mx-auto relative">
      <main className="flex">
        {/* 왼쪽 리스트 */}
        <section className="w-[645px] h-[1282px] pt-[40px] pl-[123px] flex flex-col">
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-center gap-[24px]">
              <h1 className="text-[32px] leading-[48px] font-pretendard font-bold text-[#0B0B0B]">
                긴급 찾기
              </h1>
            </div>
            <p className="font-pretendard text-[20px] leading-[30px] text-[#0B0B0B]" style={{ width: '352px' }}>
              지금 사용자님의 주변에서 가장 가깝고 이용 가능한 화장실 5개를 추천해 드렸습니다.
            </p>
          </div>

          <div className="mt-[40px] flex-1 flex flex-col gap-[24px] overflow-y-auto pb-10">
            {isLoading && <p className="text-sm text-gray-600 px-1">불러오는 중…</p>}
            {isError && <p className="text-sm text-red-600 px-1">에러: {error?.message}</p>}

            {!isLoading && !isError && items.map((t) => (
              <div
                key={t.id}
                className="w-[482px] h-[343px] flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/toilet-detail/${t.toiletId}`)}
              >
                {/* 이미지 */}
                <div className="relative w-full h-[190px] overflow-hidden">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <NearbyToilet className="w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-[10px] right-[20px]">
                    <span className={[
                      'px-[22px] py-[4px] rounded-[20px] text-[14px] font-semibold text-white flex items-center',
                      t.kind === '공공' ? 'bg-[#1FC37A]' : 'bg-[#FFB005]',
                    ].join(' ')}>
                      {t.kind}
                    </span>
                  </div>
                </div>

                {/* 내용 */}
                <div className="flex flex-col justify-between h-[153px] px-[24px] py-[12px]">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-pretendard text-[24px] font-bold text-black leading-[36px]">
                        {t.name}
                      </h3>
                      <div className="flex items-center gap-[6px]">
                        <Star className="w-[24px] h-[24px] text-[#00AEEF]" />
                        <span className="font-pretendard text-[20px] font-bold text-black leading-[30px]">
                          {t.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-[4px] text-[16px] leading-[24px] font-pretendard text-[#2C2C2C]">
                      {t.operatingHours}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-[16px]">
                      {t.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF] px-[24px] py-[8px] text-[16px] leading-[24px] text-[#2C2C2C]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/toilet-detail/${t.toiletId}`); }}
                      className="text-[14px] font-bold leading-[20px] text-[#5C5C5C] hover:text-[#444]"
                    >
                      자세히 보기 →
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!isLoading && !isError && items.length === 0 && (
              <p className="text-[16px] text-[#2C2C2C]">주변 결과가 없습니다.</p>
            )}
          </div>
        </section>

        {/* 오른쪽 지도 */}
        <MapContainer />
      </main>
    </div>
  );
}
