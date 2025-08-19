// components/toiletDetail/ReviewHeader.jsx
import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';
import ArrowDown from '@/assets/svg/toiletDetail/arrow-down.svg?react';

const ReviewHeader = ({ toilet }) => {
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
      
      <div className="h-11 px-8 py-2.5 bg-white rounded-[40px] border border-gray-4 flex items-center gap-4">
        <span className="text-body1 text-gray-6">최신순</span>
        <ArrowDown/>
      </div>
    </div>
  );
};

export default ReviewHeader;