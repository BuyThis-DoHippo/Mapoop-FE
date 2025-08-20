import { useState } from 'react';
import ReviewCard from '@/components/mypage/ReviewCard';
import { mockMyReviews } from '@/mocks/myPageData';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState(mockMyReviews);

  const handleDeleteReview = (reviewId) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">리뷰 관리</h2>
      
      {reviews.length > 0 ? (
        <div className="space-y-0">
          {reviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-heading3-regular text-gray-5 mb-4">작성한 리뷰가 없습니다.</p>
          <p className="text-body1 text-gray-5">화장실을 이용하고 첫 리뷰를 작성해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;