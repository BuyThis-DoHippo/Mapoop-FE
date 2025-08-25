import { useNavigate } from 'react-router-dom';
import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';

const ReviewCard = ({ review, onDelete }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const StarComponent = index < rating ? StarBlue : StarGray;
      return <StarComponent key={index} className="w-6 h-6" />;
    });
  };

  const handleToiletClick = () => {
    navigate(`/toilet-detail/${review.toiletId}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(review.id);
    }
  };

  return (
    <div className="border-t border-b border-gray-1 px-14 py-12">
      {/* 화장실 이름 + 삭제 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleToiletClick}
          className="flex justify-center items-center text-heading3-bold text-gray-10 hover:text-main transition-colors cursor-pointer"
        >
          {review.toiletName}
          <Arrow className="inline-block ml-4 w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-gray-0 text-gray-4 rounded border border-gray-4 hover:bg-gray-4 transition-colors"
        >
          삭제
        </button>
      </div>

      {/* 프로필 + 별점 */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-[34px] h-[34px] bg-main rounded-full flex items-center justify-center">
          <span className="text-white text-body2-bold">화</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-body1-bold text-gray-10">화장실 전문가</span>
            <div className="flex items-center gap-1">
              {renderStars(review.rating)}
            </div>
          </div>
        </div>
      </div>

      {/* 작성 날짜 */}
      <div className="text-body2 text-gray-6 mb-4">{review.createdAt}</div>

      {/* 첨부 이미지 */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-4 mb-4">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="w-[180px] h-[180px] bg-gray-1 rounded overflow-hidden"
            >
              <img
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* 리뷰 본문 */}
      <p className="text-body1 text-gray-6 mb-4">{review.content}</p>

      {/* 태그 */}
      <div className="flex gap-4">
        {review.tags.map((tag, index) => (
          <div key={index} className="px-6 py-2 bg-gray-0 rounded-[50px]">
            <span className="text-body2 text-gray-8">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
