import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

// (API 연동 전) 카드 목데이터
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

// Frame 97 카드 폭(피그마): [257, 256, 256, 256]
const cardWidths = [257, 256, 256, 256];

const nameFrames = [
  { w: 83, h: 29 }, // 제순식당
  { w: 130, h: 29 }, // 소코아 홍대점
  { w: 172, h: 58 }, // 레드로드 R6 개방 화장실
  { w: 136, h: 58 }, // 스타벅스 홍대 삼거리점
];

export default function SearchStore() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="w-full">
      <Navbar />

      {/* ===== Frame 107 : 검색 바 섹션 ===== */}
      <main className="w-[1440px] mx-auto">
        {/* 네브바 하단선과 90px, 좌 198 / 우 197 */}
        <section className="mt-[90px] pl-[198px] pr-[197px]">
          <div className="inline-flex items-center gap-[24px] relative">
            {/* 검색창: 입력 787×78 + 버튼 150×61 = 961px */}
            <SearchBar
              variant="store"
              onSearch={(q) => console.log('search:', q)}
            />

            {/* 필터 60×60 — hover/active/focus 시 테두리/배경 변경 */}
            <button
              type="button"
              aria-label="필터"
              onClick={() => setFilterOpen((v) => !v)}
              className="
                h-[60px] w-[60px] shrink-0
                inline-flex items-center justify-center
                rounded-[10px] border border-[#D9D9D9] bg-white
                transition-all duration-150
                hover:bg-[#EFEFEF] hover:border-[#7C7C7C] hover:border-2
                active:bg-[#EFEFEF] active:border-[#7C7C7C] active:border-2
                focus-visible:bg-[#EFEFEF] focus-visible:border-[#7C7C7C] focus-visible:border-2
                focus:outline-none
              "
            >
              <img src="/assets/filter.svg" alt="필터" className="h-5 w-5" />
            </button>

            {/* ✅ 필터 오버레이 (버튼 아래로 드롭) */}
            {filterOpen && (
              <div className="absolute top-[86px] right-0 z-50">
                <Filter open />
              </div>
            )}
          </div>
        </section>

        {/* ===== Frame 98 : 리스트 섹션 ===== */}
        {/* Frame107 아래 153px, 좌 123 / 우 120, 바깥 아래 203px */}
        <section className="mt-[153px] pl-[123px] pr-[120px] mb-[203px]">
          {/* 제목(24/36 regular)과 리스트 간격 44px */}
          <div className="flex flex-col items-start gap-[44px] w-full bg-white">
            <h2 className="text-[24px] leading-[36px] font-pretendard font-normal text-[#000]">
              지금 주변에 있는 가장 가까운 화장실
            </h2>

            {/* 👉 Frame 97: [←] 24 [257] 24 [256] 24 [256] 24 [256] 24 [→]  = 총 1193px */}
            <div className="w-[1193px] flex items-center gap-[24px] mb-[229px]">
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
                const imgW = cardW; // 정사각 썸네일
                const nameBox = nameFrames[idx];
                const isTwo = nameBox.h >= 58; // 2줄 여부
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
                      style={{ width: `${imgW}px`, height: `${imgW}px` }}
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

                      {/* 보정 스페이서: 1줄 이름(29px)엔 29px 추가 → 칩 Y정렬 통일 */}
                      <div style={{ height: `${extra}px` }} />

                      {/* 칩 — 95×35, 간격 16px */}
                      <div className="mt-[12px] flex flex-wrap items-center gap-[16px]">
                        {t.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-pretendard inline-flex items-center justify-center
                                       rounded-[50px] bg-[#EFEFEF] w-[95px] h-[35px]
                                       text-[16px] font-normal text-center text-[var(--grayscale-gray8,#2C2C2C)]
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

              {/* 오른쪽 화살표 */}
              <button
                type="button"
                aria-label="다음 목록"
                className="w-6 h-6 flex-shrink-0"
              >
                <img src="/assets/arrow.svg" alt="" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
