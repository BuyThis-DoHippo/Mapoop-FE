import axiosInstance from '@/apis/instance';

// 내 정보 조회
export const getMyProfile = async () => {
  const response = await axiosInstance.get('/api/users/me');
  return response.data;
};

// 내가 등록한 화장실 목록 조회
export const getMyToilets = async () => {
  const response = await axiosInstance.get('/api/users/me/toilets');
  return response.data;
};

// 사용자 리뷰 목록 조회
export const getUserReviews = async (userId, page = 1, size = 10) => {
  const response = await axiosInstance.get(`/api/users/${userId}/reviews`, {
    params: { page, size },
  });
  return response.data;
};
