// - props.open: 열림 여부
// - props.selected: 선택된 칩 라벨 배열(선택된 칩은 연하늘 배경 유지)
// - props.onClear: "필터링 취소 X" 클릭 시 호출(없어도 동작)

import PropTypes from 'prop-types';

export default function Filter({
  open = true,
  className = '',
  style,
  selected = [],
  onClear,
}) {
  if (!open) return null;

  // 칩 공통 스타일 (미선택/선택)
  const chipIdle =
    'px-8 py-2 rounded-[50px] border border-[var(--Main-Main-2,#0085B7)] bg-white text-[#0085B7] font-pretendard text-[16px] leading-normal whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FCBE6]';
  const chipOn =
    'px-8 py-2 rounded-[50px] border border-[var(--Main-Main-2,#0085B7)] bg-[var(--Main-Main3,#EBFAFF)] text-[#0085B7] font-pretendard text-[16px] leading-normal whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FCBE6]';
  const isOn = (label) => selected?.includes(label);

  return (
    <div
      role="dialog"
      aria-label="필터"
      className={[
        'inline-flex items-center gap-2 p-8 w-[387px]',
        'rounded-[10px] bg-white shadow-[4px_4px_11.1px_2px_rgba(0,0,0,0.25)]',
        className,
      ].join(' ')}
      style={style}
    >
      <div className="flex w-[323px] flex-col items-start gap-[24px]">
        {/* 이용 주체 (단일 선택) */}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={isOn('공공') ? chipOn : chipIdle}>
            공공
          </button>
          <button type="button" className={isOn('민간') ? chipOn : chipIdle}>
            민간
          </button>
        </div>

        {/* 최소 평점 (단일 선택) */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]">
            최소 평점
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* 4.5 / 4.0 / 3.5 두 표기 모두 시각적으로 같음 */}
            <button
              type="button"
              className={isOn('4.5') || isOn('4.5+') ? chipOn : chipIdle}
            >
              4.5
            </button>
            <button
              type="button"
              className={isOn('4.0') || isOn('4.0+') ? chipOn : chipIdle}
            >
              4.0
            </button>
            <button
              type="button"
              className={isOn('3.5') || isOn('3.5+') ? chipOn : chipIdle}
            >
              3.5
            </button>
          </div>
        </div>

        {/* 기본 시설 (다중 선택) */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]">
            기본 시설
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={isOn('현재이용 가능') ? chipOn : chipIdle}
            >
              현재이용 가능
            </button>
            <button
              type="button"
              className={isOn('남녀 분리') ? chipOn : chipIdle}
            >
              남녀 분리
            </button>
            <button
              type="button"
              className={isOn('가게 안 화장실') ? chipOn : chipIdle}
            >
              가게 안 화장실
            </button>
            <button
              type="button"
              className={isOn('24시간') ? chipOn : chipIdle}
            >
              24시간
            </button>
            <button
              type="button"
              className={isOn('비데 있음') ? chipOn : chipIdle}
            >
              비데 있음
            </button>
            <button
              type="button"
              className={isOn('위생용품 제공') ? chipOn : chipIdle}
            >
              위생용품 제공
            </button>
          </div>
        </div>

        {/* 상태 (다중 선택) */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]">
            상태
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={isOn('깨끗함') ? chipOn : chipIdle}
            >
              깨끗함
            </button>
            <button
              type="button"
              className={isOn('칸많음') ? chipOn : chipIdle}
            >
              칸많음
            </button>
          </div>
        </div>

        {/* 특수 시설 (다중 선택) */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left font-pretendard text-[16px] font-normal leading-normal text-[#0085B7]">
            특수 시설
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={isOn('장애인화장실') ? chipOn : chipIdle}
            >
              장애인화장실
            </button>
            <button
              type="button"
              className={isOn('기저귀교환대') ? chipOn : chipIdle}
            >
              기저귀교환대
            </button>
          </div>
        </div>

        {/* 전체 초기화 */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={() => onClear?.()}
            className="inline-flex items-center justify-center px-5 h-[35px] rounded-[50px] border border-neutral-300 bg-neutral-50 font-pretendard text-[16px] leading-normal text-neutral-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0D0D0]"
          >
            필터링 취소 X
          </button>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  selected: PropTypes.arrayOf(PropTypes.string),
  onClear: PropTypes.func,
};
