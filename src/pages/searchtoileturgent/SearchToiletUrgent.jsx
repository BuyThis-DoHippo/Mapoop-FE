import Navbar from '@/components/layout/Navbar';
import { nearbyToiletsUrgent } from '@/mocks/mockUrgent';
import Star from '@/assets/svg/star.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';
import MapContainer from './MapContainer';

export default function SearchToiletUrgent() {
  return (
    <div className="w-[1440px] mx-auto relative">
      {/* Navbar */}
      <Navbar active="toilet" />

      <main className="flex">
        {/* 왼쪽 카드 리스트 */}
        <section className="w-[645px] h-[1282px] pt-[40px] pl-[123px] flex flex-col">
          {/* 제목 + 설명 */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-center gap-[24px]">
              <h1 className="text-[32px] leading-[48px] font-pretendard font-bold text-[#0B0B0B]">
                긴급 찾기
              </h1>
            </div>

            <p
              className="font-pretendard text-[20px] font-normal leading-[30px] text-[#0B0B0B]"
              style={{ width: '352px' }}
            >
              지금 사용자님의 주변에서 가장 가깝고 이용 가능한 화장실 5개를
              추천해 드렸습니다.
            </p>
          </div>

          {/* 카드 리스트 */}
          <div className="mt-[40px] flex-1 flex flex-col gap-[24px] overflow-y-auto pb-10">
            {nearbyToiletsUrgent.map((t) => (
              <div
                key={t.id}
                className="w-[482px] h-[343px] flex flex-col rounded-[10px] border border-[#DBDBDB] bg-white overflow-hidden flex-shrink-0"
              >
                {/* 이미지 영역 */}
                <div className="relative w-full h-[190px] overflow-hidden">
                  <NearbyToilet className="w-full h-full object-cover" />
                  <div className="absolute bottom-[10px] right-[20px]">
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
                    <p className="mt-[4px] text-[16px] leading-[24px] font-pretendard font-normal text-[#2C2C2C]">
                      매일 11:30~21:00
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-[16px]">
                      {t.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center justify-center rounded-[50px] bg-[#EFEFEF]
                                     px-[24px] py-[8px]
                                     text-[16px] leading-[24px] font-pretendard font-normal text-[#2C2C2C]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="text-[14px] font-bold leading-[20px] text-[#5C5C5C] font-pretendard hover:text-[#444] transition-colors">
                      자세히 보기 →
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {nearbyToiletsUrgent.length === 0 && (
              <p className="text-[16px] text-gray-500 mt-4">
                조건에 맞는 화장실이 없습니다.
              </p>
            )}
          </div>
        </section>

        {/* 오른쪽 지도 */}
        <div className="w-[795px] h-[1282px]">
          <MapContainer />
        </div>
      </main>
    </div>
  );
}
