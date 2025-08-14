import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch, variant = 'home' }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  const containerWidth = variant === 'store' ? 'w-[961px]' : 'w-[961px]';
  const inputWidth = variant === 'store' ? 'w-[787px]' : 'w-[787px]';
  const btnSize =
    variant === 'store' ? 'w-[150px] h-[61px]' : 'w-[150px] h-[61px]';

  return (
    <form onSubmit={submit} className="w-full flex justify-center">
      {/* 검색창 */}
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
            rounded-[50px] bg-brand-3 border-0
            pt-[27px] pb-[27px] pl-[47px] pr-[47px]
            font-pretendard text-[20px] leading-normal
            text-neutral-950 placeholder:text-neutral-950
            focus:placeholder-transparent
            outline-none
          `}
        />

        {/* 검색 버튼 */}
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
