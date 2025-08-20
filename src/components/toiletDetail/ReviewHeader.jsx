// components/toiletDetail/ReviewHeader.jsx
import { useState } from 'react';
import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';
import ArrowDown from '@/assets/svg/toiletDetail/arrow-down.svg?react';

const ReviewHeader = ({ toilet, onSortChange, currentSort = 'latest' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'rating_low', label: '별점낮은 순' },
    { value: 'rating_high', label: '별점 높은 순' }
  ];

  const handleSortSelect = (sortValue) => {
    console.log('Selected sort:', sortValue);
    setIsDropdownOpen(false);
    if (onSortChange) {
      onSortChange(sortValue);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const StarComponent = index < Math.floor(rating) ? StarBlue : StarGray;
      return (
        <StarComponent 
          key={index}
          className="w-[29px] h-[29px]"
        />
      );
    });
  };

  if (!toilet) return null;

  const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label || '최신순';

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col gap-6">
        <h2 className="text-heading3-bold text-black">화장실 리뷰</h2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="text-heading3-bold text-black">평점</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(toilet.rating.avg_rating)}
              </div>
              <span className="text-heading3-bold text-black">{toilet.rating.avg_rating}</span>
            </div>
          </div>
          <span className="text-body1 text-black">({toilet.rating.total_reviews}건의 리뷰)</span>
        </div>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-11 px-8 py-2.5 bg-white rounded-[40px] border border-gray-4 flex items-center gap-4 hover:bg-gray-0 transition-colors"
        >
          <span className="text-body1 text-gray-6">{currentSortLabel}</span>
          <ArrowDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-2 rounded-[10px] shadow-lg z-10 min-w-[140px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-0 transition-colors first:rounded-t-[10px] last:rounded-b-[10px] ${
                  currentSort === option.value 
                    ? 'text-main font-bold' 
                    : 'text-gray-7'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewHeader;