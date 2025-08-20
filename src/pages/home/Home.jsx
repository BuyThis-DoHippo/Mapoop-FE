import SearchBar from '@/components/common/SearchBar';
import { useNavigate } from 'react-router-dom';
import { nearbyToilets } from '@/mocks/mockToilets';

// svg 컴포넌트 import
import FindToilet from '@/assets/svg/FindToilet.svg?react';
import FindToiletHurry from '@/assets/svg/FindToiletHurry.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';
import ArrowLeft from '@/assets/svg/arrowleft.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';
import Star from '@/assets/svg/star.svg?react';

export default function Home() {
  const navigate = useNavigate();

  // 카드 폭 배열(슬라이드 4장)
  const cardWidths = [257, 256, 256, 256];
  const nameFrames = [
    { w: 83, h: 29 },
    { w: 130, h: 29 },
    { w: 172, h: 58 },
    { w: 136, h: 58 },
  ];

  return (
    <div className="w-full">

      <section className="w-full px-[125px] pt-[65px]">
        <div className="max-w-[1193px] mx-auto">
          <SearchBar onSearch={(q) => console.log('search:', q)} />

          {/* 화장실 찾기 / 긴급 찾기 */}
          <div className="pt-[65px] flex items-start gap-[32px]">
            <button
              type="button"
              aria-label="화장실 찾기"
              onClick={() => navigate('/find-toilet')}
              className="w-[785px] h-[482px] rounded-[20px] overflow-hidden flex-shrink-0 focus:outline-none hover:opacity-95"
            >
              <FindToilet className="block w-full h-full" />
            </button>

            <button
              type="button"
              aria-label="긴급 찾기"
              onClick={() => navigate('/find-toilet/urgent')}
              className="w-[380px] h-[482px] rounded-[20px] overflow-hidden flex-shrink-0 focus:outline-none hover:opacity-95"
            >
              <FindToiletHurry className="block w-full h-full" />
            </button>
          </div>

          {/* 등록 / 챗봇 CTA */}
          <div className="pt-[40px] flex gap-[32px]">
            <button
              type="button"
              aria-label="화장실 등록"
              onClick={() => navigate('/register-toilet')}
              className="w-[583px] h-[183px] flex-shrink-0 rounded-[10px] border-2 border-gray-2 bg-white px-[60px] py-[41px] flex items-center justify-start gap-[45px] text-left"
            >
              <div className="flex-1 max-w-[463px]">
                <p className="text-body2 w-[169px] h-[48px] text-gray-10">
                  지도에 등록되어 있지 않은 화장실을 등록해요
                </p>
                <p className="mt-6 text-heading3-bold text-gray-10">
                  화장실 등록
                </p>
              </div>
              <Arrow className="w-6 h-6" />
            </button>

            <button
              type="button"
              aria-label="마포구 AI 화장실 챗봇"
              onClick={() => navigate('/ai-chatbot')}
              className="w-[583px] h-[183px] flex-shrink-0 rounded-[10px] border-2 border-gray-2 bg-white px-[60px] py-[41px] flex items-center justify-start gap-[45px] text-left"
            >
              <div className="flex-1 max-w-[463px]">
                <p className="text-body2 w-[207px] h-[48px] text-gray-10">
                  AI 챗봇에게 마포구
                  <br />
                  화장실 정보를 물어봐요
                </p>
                <p className="mt-6 text-heading3-bold text-gray-10">
                  마포구 AI 화장실 챗봇
                </p>
              </div>
              <Arrow className="w-6 h-6" />
            </button>
          </div>

          {/* 구분선 */}
          <div className="mt-16 w-[1193px] h-px bg-gray-1" />

          {/* 근처 화장실 섹션 */}
          <div className="w-[1193px] flex flex-col items-start gap-[60px] mx-auto">
            <div className="w-full h-px bg-gray-1" />

            <div className="flex flex-col items-start gap-[44px] w-full">
              <div className="w-full flex items-start justify-between">
                <h2 className="text-heading2 text-gray-10">
                  지금 주변에 있는
                  <br />
                  가장 가까운 화장실
                </h2>

                <button
                  type="button"
                  onClick={() => navigate('/find-toilet')}
                  className="
                    text-body2
                    text-gray-4
                    whitespace-nowrap
                    hover:opacity-80
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-main/30
                  "
                >
                  화장실 더보기 →
                </button>
              </div>

              {/* 리스트: 좌우 화살표 + 카드 4장 */}
              <div className="w-[1193px] flex items-center gap-6">
                {/* 이전 화살표 */}
                <button
                  type="button"
                  aria-label="이전 목록"
                  className="w-6 h-6 flex-shrink-0"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                {nearbyToilets.map((t, idx) => {
                  const cardW = cardWidths[idx];
                  const imgSize = cardW;
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
                        style={{
                          width: `${imgSize}px`,
                          height: `${imgSize}px`,
                        }}
                      >
                        <NearbyToilet className="w-full h-full object-contain" />

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

                      {/* 텍스트 영역 */}
                      <div className="mt-4">
                        {/* 가게명 + 평점 */}
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

                <button
                  type="button"
                  aria-label="다음 목록"
                  className="w-6 h-6 flex-shrink-0"
                >
                  <Arrow className="w-6 h-6" />
                </button>
              </div>

              <div className="w-[1193px] h-[144px] bg-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}