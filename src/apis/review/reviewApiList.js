import axiosInstance from '@/apis/instance';

export const fetchReviewToilets = async (params = {}) => {
  const res = await axiosInstance.get('/api/search/results', { params });
  return res.data;
};
