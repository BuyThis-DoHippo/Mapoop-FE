import axiosInstance from '@/apis/instance';

// 주변 화장실 조회
export const getNearbyToilets = async () => {
  const res = await axiosInstance.get('/api/toilets/nearby');
  return res.data;
};
