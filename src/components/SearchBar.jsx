import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch, variant = 'home' }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  // 홈 vs 가게검색 페이지 레이아웃
  const containerWidth = variant === 'store' ? 'w-[961px]' : 'w-[961px]'; // 홈도 961 쓰던 구조 유지
  const inputWidth = variant === 'store' ? 'w-[787px]' : 'w-[787px]';
  const btnSize =
    variant === 'store' ? 'w-[150px] h-[61px]' : 'w-[150px] h-[61px]';

  return (
    <form onSubmit={submit} className="w-full flex justify-center">
      {/* store: 961px(= 787 + 24 + 150), home도 기존 폭 유지 */}
      <div
        className={`${containerWidth} h-[78px] mx-auto flex items-center gap-[24px]`}
      >
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="가고자 하는 곳의 화장실 리뷰를 확인해봐요"
          className={`
            ${inputWidth} h-[78px]
            rounded-[50px] border-[2px] border-[#00AEEF] bg-white
            pt-[27px] pb-[27px] pl-[47px] pr-[47px]
            font-pretendard text-[20px] font-normal leading-normal
            text-neutral-950 placeholder:text-[#0B0B0B]
            outline-none focus:ring-2 focus:ring-[#00AEEF]/25
            focus:placeholder-transparent
          `}
        />

        {/* 검색 버튼: store에서는 150×61 */}
        <button
          type="submit"
          className={`
            ${btnSize} shrink-0
            inline-flex items-center justify-center
            rounded-[10px] bg-brand-main hover:bg-brand-2
            focus:outline-none focus:ring-2 focus:ring-brand-main/30
          `}
          aria-label="검색"
        >
          <span className="font-pretendard text-white text-[20px] font-normal leading-normal">
            검색
          </span>
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  variant: PropTypes.oneOf(['home', 'store']),
};
