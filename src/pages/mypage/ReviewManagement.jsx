import ReviewCard from '@/components/mypage/ReviewCard';
import { useUserReviews, useDeleteReview } from '@/hooks/mypage/useReviewApi';
import useAuthStore from '@/stores/authStore';

const ReviewManagement = () => {
  const { user } = useAuthStore(); // 로그인 유저 정보 (user.id)
  const { data, isLoading, isError } = useUserReviews(user?.id, 1, 10);
  const { mutate: deleteReview } = useDeleteReview();

  if (isLoading) return <p>리뷰 불러오는 중...</p>;
  if (isError) return <p>리뷰 불러오기 실패</p>;

  const reviews = data?.data?.reviews || [];

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        리뷰 관리
      </h2>

      {reviews.length > 0 ? (
        <div className="divide-y divide-gray-2 border-t border-b border-gray-2">
          {reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              review={{
                id: review.reviewId,
                toiletId: review.toiletId,
                toiletName: review.toiletName,
                rating: review.rating,
                createdAt: review.createdAt,
                content: review.content,
                tags: review.tags.map((t) => t.tagName),
                images: review.imageUrls,
              }}
              onDelete={() => deleteReview(review.reviewId)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-heading3-regular text-gray-5 mb-4">
            작성한 리뷰가 없습니다.
          </p>
          <p className="text-body1 text-gray-5">
            화장실을 이용하고 첫 리뷰를 작성해보세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
