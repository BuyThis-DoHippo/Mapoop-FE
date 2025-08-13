import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <form onSubmit={submit} className="w-full flex justify-center">
      <div className="w-[961px] h-[78px] mx-auto flex items-center gap-[24px]">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="가고자 하는 곳의 화장실 리뷰를 확인해봐요"
          className="
            w-[787px] h-[78px]
            rounded-[50px] border-[2px] border-[#00AEEF] bg-white
            pt-[27px] pb-[27px] pl-[47px] pr-[47px]
            font-pretendard text-[20px] font-normal leading-normal
            text-neutral-950 placeholder:text-[#0B0B0B]
            outline-none focus:ring-2 focus:ring-[#00AEEF]/25
            focus:placeholder-transparent
          "
        />

        <button
          type="submit"
          className="
            inline-flex items-center justify-center
            gap-[10px] px-[54px] py-[16px]
            rounded-[10px] bg-brand-main hover:bg-brand-2
            focus:outline-none focus:ring-2 focus:ring-brand-main/30
          "
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
};
