import axiosInstance from '@/apis/instance';

// 내가 등록한 화장실 목록 조회
export const getMyToilets = async () => {
  const response = await axiosInstance.get('/api/users/me/toilets');
  return response.data;
};
