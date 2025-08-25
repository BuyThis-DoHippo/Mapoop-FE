import SearchBar from '@/components/common/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AiChatbot from '@/pages/aiChatBot/AiChatbot';

import FindToilet from '@/assets/svg/FindToilet.svg?react';
import FindToiletHurry from '@/assets/svg/FindToiletHurry.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';
import ArrowLeft from '@/assets/svg/arrowleft.svg?react';
import NearbyToilet from '@/assets/svg/NearbyToilet.svg?react';
import Star from '@/assets/svg/star.svg?react';

// API hook (SearchStore와 동일한 거 활용)
import { useSearchResults } from '@/hooks/store/useStoreApi';

export default function Home() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  // 카드 페이지네이션 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // API 호출 (필터링 없이 전체 조회)
  const { data, isLoading, error } = useSearchResults({}, { enabled: true });
  const toilets = data?.data?.toilets || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 4));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(toilets.length - 4, prev + 4));
  };

  // 홈 검색창에서 입력 → /search-store 페이지로 이동
  const handleSearch = (q) => {
    if (!q.trim()) return;
    navigate(`/search-store?keyword=${encodeURIComponent(q)}`);
  };

  return (
    <div className="w-full">
      <section className="w-full px-[125px] pt-[65px]">
        <div className="max-w-[1193px] mx-auto">
          <SearchBar onSearch={handleSearch} />

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
              onClick={() => setChatOpen(true)}
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

          {/* 챗봇 모달 */}
          {chatOpen && <AiChatbot onClose={() => setChatOpen(false)} />}

          {/* 근처 화장실 섹션 */}
          <div className="mt-16 w-[1193px] flex flex-col items-start gap-[60px] mx-auto">
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
                  className="text-body2 text-gray-4 whitespace-nowrap hover:opacity-80"
                >
                  화장실 더보기 →
                </button>
              </div>

              {isLoading && <p>로딩중...</p>}
              {error && <p>에러 발생: {error.message}</p>}
              {!isLoading && toilets.length === 0 && (
                <p className="text-gray-6 text-body1 mt-8">
                  검색 결과가 없습니다.
                </p>
              )}

              <div className="w-[1193px] flex items-center gap-6">
                {/* 이전 화살표 */}
                <button
                  type="button"
                  aria-label="이전 목록"
                  className="w-6 h-6 disabled:opacity-30"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                {/* 카드 4개씩 */}
                {toilets.slice(currentIndex, currentIndex + 4).map((t) => (
                  <div
                    key={t.toiletId}
                    className="flex-shrink-0 h-[393px] w-[256px] cursor-pointer"
                    onClick={() => navigate(`/toilet-detail/${t.toiletId}`)}
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

                    {/* 이름 + 평점 + 태그 */}
                    <div className="mt-4">
                      <div className="flex items-start justify-between">
                        <p
                          className="text-heading3-bold text-gray-10 truncate"
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

                {/* 다음 화살표 */}
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

              {/* 카드 리스트 하단 넉넉한 여백 */}
              <div className="mb-[100px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
