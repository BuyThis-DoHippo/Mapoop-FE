import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAutoComplete } from '@/hooks/store/useStoreApi';

export default function SearchBar({ onSearch, variant = 'home' }) {
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);

  // 자동완성 API
  const { data: autoData } = useAutoComplete(q, 8, {
    enabled: q.length > 0,
  });
  const suggestions = autoData?.data?.suggestions || [];

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch?.(q.trim());
    setFocus(false);
  };

  const handleSelectSuggestion = (text) => {
    setQ(text);
    onSearch?.(text);
    setFocus(false);
  };

  const containerWidth = variant === 'store' ? 'w-[961px]' : 'w-[961px]';
  const inputWidth = variant === 'store' ? 'w-[787px]' : 'w-[787px]';
  const btnSize =
    variant === 'store' ? 'w-[150px] h-[61px]' : 'w-[150px] h-[61px]';

  return (
    <form onSubmit={submit} className="w-full flex justify-center relative">
      <div
        className={`${containerWidth} h-[78px] mx-auto flex items-center gap-6 relative`}
      >
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          placeholder="가고자 하는 곳의 화장실 리뷰를 확인해봐요"
          className={`
            ${inputWidth} h-[78px]
            rounded-[50px] bg-main-3 border-0
            pt-[27px] pb-[27px] pl-[47px] pr-[47px]
            text-body1
            text-gray-9 placeholder:text-gray-9
            focus:placeholder-transparent
            outline-none
          `}
        />

        <button
          type="submit"
          className={`
            ${btnSize} shrink-0
            inline-flex items-center justify-center
            rounded-[10px] bg-main hover:bg-main-2
            focus:outline-none focus:ring-2 focus:ring-main/30
          `}
          aria-label="검색"
        >
          <span className="text-body1 text-white">검색</span>
        </button>

        {/* 자동완성 드롭다운 */}
        {focus && suggestions.length > 0 && (
          <ul className="absolute top-[80px] left-0 bg-white border border-gray-3 rounded-md shadow-lg w-full max-h-60 overflow-y-auto z-50">
            {suggestions.map((s) => (
              <li
                key={s.toiletId}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-9 text-body2"
                onClick={() => handleSelectSuggestion(s.name)}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  variant: PropTypes.oneOf(['home', 'store']),
};
