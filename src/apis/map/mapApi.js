import axiosInstance from '@/apis/instance';

/**
 * 지도에 표시할 모든 화장실 마커 데이터를 조회합니다.
 */
export const getMapMarkers = async (params = {}) => {
  const response = await axiosInstance.get('/api/map/markers', { params });
  return response.data;
};