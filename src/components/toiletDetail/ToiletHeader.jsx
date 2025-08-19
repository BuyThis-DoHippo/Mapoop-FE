import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';

const ToiletHeader = ({ toilet }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const StarComponent = index < Math.floor(rating) ? StarBlue : StarGray;
      return (
        <StarComponent 
          key={index}
          className="w-[34px] h-[34px]"
        />
      );
    });
  };

  if (!toilet) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-6">
        <h1 className="text-heading1 text-black">{toilet.name}</h1>
        <div className="px-6 py-2 bg-amber-500 rounded-[20px] flex items-center">
          <span className="text-body1-bold text-white">민간</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {renderStars(toilet.rating.avg_rating)}
        </div>
        <span className="text-heading3-bold text-black">{toilet.rating.avg_rating}</span>
      </div>
    </div>
  );
};

export default ToiletHeader;