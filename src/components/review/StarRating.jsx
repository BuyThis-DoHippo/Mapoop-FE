import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';

const StarRating = ({ rating, onRatingChange, className = "" }) => {
  const handleStarClick = (selectedRating) => {
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const StarComponent = index < rating ? StarBlue : StarGray;
      return (
        <StarComponent 
          key={index}
          className="w-[71px] h-[71px] cursor-pointer transition-transform hover:scale-110"
          onClick={() => handleStarClick(index + 1)}
        />
      );
    });
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-heading3-bold text-gray-10">별점</h2>
      <div className="flex gap-4">
        {renderStars()}
      </div>
    </div>
  );
};

export default StarRating;