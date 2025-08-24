import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserReviews, deleteReview } from '@/apis/mypage/reviewApi';

export const useUserReviews = (userId, page = 1, size = 10) => {
  return useQuery({
    queryKey: ['userReviews', userId, page],
    queryFn: () => getUserReviews(userId, page, size),
    keepPreviousData: true,
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(['userReviews']); // 목록 갱신
      alert('리뷰가 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제에 실패했습니다.');
    },
  });
};
