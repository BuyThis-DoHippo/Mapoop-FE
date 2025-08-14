import PropTypes from 'prop-types';

export default function Filter({ open = true, className = '', style }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="필터"
      className={[
        // Frame 108
        'inline-flex items-center gap-2 p-8',
        'rounded-[10px] bg-white',
        'shadow-[4px_4px_11.1px_2px_rgba(0,0,0,0.25)]',
        className,
      ].join(' ')}
      style={style}
    >
      {/* Frame 120 */}
      <div className="flex w-[323px] flex-col items-start gap-[32px]">
        {/* 첫번째 줄*/}
        <div className="w-full flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="
              flex items-center justify-center gap-2
              px-8 py-2 rounded-[50px]
              border border-[#0085B7] bg-white
              font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
              whitespace-nowrap
            "
          >
            공공
          </button>

          <button
            type="button"
            className="
              flex items-center justify-center gap-2
              px-8 py-2 rounded-[50px]
              border border-[#0085B7] bg-white
              font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
              whitespace-nowrap
            "
          >
            민간
          </button>
        </div>

        {/* 2번째 줄: 최소 평점  */}
        <div className="w-full flex flex-col items-start">
          <button
            type="button"
            className="
              bg-transparent text-left
              font-pretendard text-[16px] font-normal leading-normal text-brand-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-2/30
            "
          >
            최소 평점
          </button>

          {/* 3번째 줄 */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              4.5
            </button>
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              4.0
            </button>
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              3.5
            </button>
          </div>

          {/* 4번째 줄 */}
          <button
            type="button"
            className="
                mt-8 bg-transparent text-left
                font-pretendard text-[16px] font-normal leading-normal text-brand-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-2/30
            "
          >
            기본 시설
          </button>

          {/*5번째 줄 */}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              현재이용 가능
            </button>
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              남녀 분리
            </button>
          </div>

          {/* 6번째 줄 */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              가게 안 화장실
            </button>
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              24시간
            </button>
          </div>

          {/*7번쨰 줄 */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              비데 있음
            </button>
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              위생용품 제공
            </button>
          </div>

          {/*8번쨰 줄 */}

          <button
            type="button"
            className="
                mt-8 bg-transparent text-left
                font-pretendard text-[16px] font-normal leading-normal text-brand-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-2/30
            "
          >
            상태
          </button>

          {/*9번쨰 줄 */}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              깨끗함
            </button>

            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              칸많음
            </button>
          </div>

          {/*10번쨰 줄 */}
          <button
            type="button"
            className="
                mt-8 bg-transparent text-left
                font-pretendard text-[16px] font-normal leading-normal text-brand-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-2/30
            "
          >
            특수 시설
          </button>

          {/*11번쨰 줄 */}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              장애인화장실
            </button>

            <button
              type="button"
              className="
                px-8 py-2 rounded-[50px]
                border border-[#0085B7] bg-white
                font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]
                whitespace-nowrap
              "
            >
              기저귀교환대
            </button>
          </div>

          <div className="mt-[33px] w-full flex justify-end">
            <button
              type="button"
              className="
                inline-flex items-center justify-center
                py-2 px-6                 /* 8px 24px */
                rounded-[50px]
                border border-neutral-300 /* #9E9E9E */
                bg-neutral-50             /* #EFEFEF */
                font-pretendard text-[16px] font-normal leading-normal
                text-neutral-300          /* #9E9E9E */
                "
            >
              필터링 취소 X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
