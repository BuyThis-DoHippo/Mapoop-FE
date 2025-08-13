import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // 카드 데이터 (API 연동 전)
  const nearbyToilets = [
    {
      id: 1,
      name: '제순식당',
      rating: 4.3,
      kind: '민간',
      tags: ['깨끗한', '가게 안'],
    },
    {
      id: 2,
      name: '소코아 홍대점',
      rating: 4.3,
      kind: '민간',
      tags: ['깨끗한', '가게 밖'],
    },
    {
      id: 3,
      name: '레드로드 R6 개방 화장실',
      rating: 4.3,
      kind: '공공',
      tags: ['24시간', '위생용품제공'],
    },
    {
      id: 4,
      name: '스타벅스 홍대 삼거리점',
      rating: 4.3,
      kind: '민간',
      tags: ['깨끗한', '가게 안'],
    },
  ];

  // 리스트 컨테이너 폭 1193px 기준 (화살표/갭 포함 총 1193)
  const cardWidths = [257, 256, 256, 256];

  // 이름 프레임 (w × h) — line-height 29px 기준 (1줄=29, 2줄=58)
  const nameFrames = [
    { w: 83, h: 29 }, // 제순식당
    { w: 130, h: 29 }, // 소코아 홍대점
    { w: 172, h: 58 }, // 레드로드 R6 개방 화장실
    { w: 136, h: 58 }, // 스타벅스 홍대 삼거리점
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* 화면 좌우 125px, 위 65px */}
      <section className="w-full px-[125px] pt-[65px]">
        <div className="max-w-[1193px] mx-auto">
          <SearchBar onSearch={(q) => console.log('search:', q)} />

          {/* 1행: 상단 큰 카드 2개 (버튼으로 변경) */}
          <div className="pt-[65px] flex items-start gap-[32px]">
            {/* 화장실 찾기 */}
            <button
              type="button"
              aria-label="화장실 찾기"
              onClick={() => navigate('/find-toilet')}
              className="w-[785px] h-[482px] rounded-[20px] overflow-hidden flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main/40 hover:opacity-95"
            >
              <img
                src="/assets/FindToilet.svg"
                alt=""
                className="block w-full h-full"
                aria-hidden
              />
            </button>

            {/* 긴급 찾기 */}
            <button
              type="button"
              aria-label="긴급 찾기"
              onClick={() => navigate('/find-toilet/urgent')}
              className="w-[380px] h-[482px] rounded-[20px] overflow-hidden flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main/40 hover:opacity-95"
            >
              <img
                src="/assets/FindToiletHurry.svg"
                alt=""
                className="block w-full h-full"
                aria-hidden
              />
            </button>
          </div>

          {/* 2행: 하단 버튼 2개 */}
          <div className="pt-[40px] flex gap-[32px]">
            <button
              type="button"
              className="w-[583px] h-[183px] flex-shrink-0 rounded-[10px] border-2 border-brand-main bg-brand-3 px-[60px] py-[41px] flex items-center justify-start gap-[45px] text-left"
            >
              <div className="font-pretendard flex-1 max-w-[463px]">
                <p className="text-[16px] w-[169px] h-[48px] leading-[24px] text-[#0B0B0B]">
                  지도에 등록되어 있지 않은 화장실을 등록해요
                </p>
                <p className="mt-[24px] text-[24px] font-bold text-black">
                  화장실 등록
                </p>
              </div>
              <img
                src="/assets/arrow.svg"
                alt=""
                className="w-6 h-6"
                aria-hidden
              />
            </button>

            <button
              type="button"
              className="w-[583px] h-[183px] flex-shrink-0 rounded-[10px] border-2 border-brand-main bg-brand-3 px-[60px] py-[41px] flex items-center justify-start gap-[45px] text-left"
            >
              <div className="font-pretendard flex-1 max-w-[463px]">
                <p className="text-[16px] w-[207px] h-[48px] leading-[24px] text-[#0B0B0B]">
                  AI 챗봇에게 마포구
                  <br />
                  화장실 정보를 물어봐요
                </p>
                <p className="mt-[24px] text-[24px] font-bold text-black">
                  마포구 AI 화장실 챗봇
                </p>
              </div>
              <img
                src="/assets/arrow.svg"
                alt=""
                className="w-6 h-6"
                aria-hidden
              />
            </button>
          </div>

          {/* 회색 선 */}
          <div className="mt-[64px] w-[1193px] h-px bg-[#D8D8D8]" />

          {/* Frame 98 */}
          <div className="w-[1193px] flex flex-col items-start gap-[60px] mx-auto">
            <div className="w-full h-px bg-[#D8D8D8]" />

            {/* 제목 + 리스트(Frame 97) */}
            <div className="flex flex-col items-start gap-[44px]">
              <h2 className="font-pretendard text-black text-[32px] leading-[48px] font-extrabold">
                지금 주변에 있는
                <br />
                가장 가까운 화장실
              </h2>

              {/* 👉 Frame 97: [←] 24 [257] 24 [256] 24 [256] 24 [256] 24 [→]  === 총 1193px */}
              <div className="w-[1193px] flex items-center gap-[24px]">
                {/* 왼쪽 화살표 */}
                <button
                  type="button"
                  aria-label="이전 목록"
                  className="w-6 h-6 flex-shrink-0"
                >
                  <img src="/assets/arrowleft.svg" alt="" className="w-6 h-6" />
                </button>

                {/* 카드 4개 */}
                {nearbyToilets.map((t, idx) => {
                  const cardW = cardWidths[idx];
                  const imgSize = cardW; // 정사각 이미지
                  const nameBox = nameFrames[idx];
                  const isTwo = nameBox.h >= 58;
                  const extra = Math.max(0, 58 - nameBox.h); // 칩 Y정렬 보정

                  return (
                    <div
                      key={t.id}
                      className="flex-shrink-0 h-[393px]"
                      style={{ width: `${cardW}px` }}
                    >
                      {/* 썸네일 */}
                      <div
                        className="relative rounded-[10px] overflow-hidden"
                        style={{
                          width: `${imgSize}px`,
                          height: `${imgSize}px`,
                        }}
                      >
                        <img
                          src="/assets/NearbyToilet.svg"
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                        {/* 민간/공공 뱃지 */}
                        <span
                          className={[
                            'absolute right-[12px] bottom-[12px] h-[28px] px-[12px] rounded-full',
                            'text-[12px] font-semibold text-white flex items-center',
                            t.kind === '공공' ? 'bg-[#1FC37A]' : 'bg-[#FFC83A]',
                          ].join(' ')}
                        >
                          {t.kind}
                        </span>
                      </div>

                      {/* 텍스트 블록 — 이미지와 16px 간격 */}
                      <div className="mt-[16px]">
                        {/* 이름 + 별점 (⭐ 상단 정렬) */}
                        <div className="flex items-start justify-between">
                          <p
                            className="font-pretendard text-black text-[24px] font-bold leading-[29px]"
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

                          <div className="flex items-center gap-[8px]">
                            <img
                              src="/assets/star.svg"
                              alt=""
                              aria-hidden
                              className="w-[24px] h-[24px]"
                            />
                            <span className="w-[31px] h-[24px] font-pretendard text-black text-[20px] font-bold leading-[24px] text-right">
                              {t.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        {/* 보정 스페이서: 1줄 이름(29px)에 29px 추가 → 칩 Y정렬 통일 */}
                        <div style={{ height: `${extra}px` }} />

                        {/* 칩 — 전부 95×35 고정, 간격 16px */}
                        <div className="mt-[12px] flex flex-wrap items-center gap-[16px]">
                          {t.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="
                                font-pretendard inline-flex items-center justify-center
                                rounded-[50px] bg-[#EFEFEF]
                                w-[95px] h-[35px]
                                text-[16px] font-normal text-center
                                text-[var(--grayscale-gray8,#2C2C2C)]
                                whitespace-nowrap overflow-hidden text-ellipsis
                              "
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

                {/* 오른쪽 화살표 */}
                <button
                  type="button"
                  aria-label="다음 목록"
                  className="w-6 h-6 flex-shrink-0"
                >
                  <img src="/assets/arrow.svg" alt="" className="w-6 h-6" />
                </button>
              </div>

              {/* 아래 여백용 흰 배경 144px */}
              <div className="w-[1193px] h-[144px] bg-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
