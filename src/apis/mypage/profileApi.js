import axiosInstance from '@/apis/instance';

// 내 정보 조회
export const getMyProfile = async () => {
  const response = await axiosInstance.get('/api/users/me');
  return response.data;
};
