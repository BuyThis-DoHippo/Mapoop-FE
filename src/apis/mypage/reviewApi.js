import axiosInstance from '@/apis/instance';

// 내 리뷰 목록 조회
export const getUserReviews = async (userId, page = 1, size = 10) => {
  const response = await axiosInstance.get(`/api/users/${userId}/reviews`, {
    params: { page, size },
  });
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (reviewId) => {
  const response = await axiosInstance.delete(`/api/reviews/${reviewId}`);
  return response.data;
};
