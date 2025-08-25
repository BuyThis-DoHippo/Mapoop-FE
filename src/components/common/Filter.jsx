import PropTypes from 'prop-types';

export default function Filter({
  open = true,
  className = '',
  style,
  selected = [],
  onClear,
}) {
  if (!open) return null;

  // 팝오버 칩
  const chipBase =
    'inline-flex items-center h-[35px] px-8 rounded-[50px] ' +
    'text-body2 whitespace-nowrap ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FCBE6]';

  const chipIdle = chipBase + ' border border-main-2 bg-white text-main-2';
  const chipOn = chipBase + ' border border-main-2 bg-main-3 text-main-2';

  // 선택 확인
  const isOn = (label) => {
    if (!selected) return false;
    if (label === '4.5' || label === '4.0' || label === '3.5') {
      return selected.includes(label) || selected.includes(`${label}+`);
    }
    return selected.includes(label);
  };

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
      <div className="flex w-[323px] flex-col items-start gap-6">
        {/* 이용 주체 */}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={isOn('공공') ? chipOn : chipIdle}>
            공공
          </button>
          <button type="button" className={isOn('민간') ? chipOn : chipIdle}>
            민간
          </button>
        </div>

        {/* 최소 평점 */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left text-body2 text-main-2">최소 평점</div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={isOn('4.5') ? chipOn : chipIdle}>
              4.5
            </button>
            <button type="button" className={isOn('4.0') ? chipOn : chipIdle}>
              4.0
            </button>
            <button type="button" className={isOn('3.5') ? chipOn : chipIdle}>
              3.5
            </button>
          </div>
        </div>

        {/* 기본 시설 */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left text-body2 text-main-2">기본 시설</div>
          <div className="flex flex-wrap items-center gap-2">
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

        {/* 상태 */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left text-body2 text-main-2">상태</div>
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

        {/* 특수 시설 */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-left text-body2 text-main-2">특수 시설</div>
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
            className="
              inline-flex items-center justify-center h-[35px] px-6
              rounded-[50px]
              border border-gray-3
              bg-gray-0
              text-gray-3
              text-body2
              hover:opacity-90 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-[#D0D0D0]
            "
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