import axiosInstance from '@/apis/instance';

/**
 * 지도에 표시할 모든 화장실 마커 데이터를 조회합니다.
 * 
 * @param {Object} params - 조회 파라미터
 * @param {number} params.lat - 위도 (선택)
 * @param {number} params.lng - 경도 (선택)
 * @param {number} params.minRating - 최소 평점 (선택)
 * @param {string} params.type - 화장실 타입: PUBLIC, PRIVATE (선택)
 * @param {string[]} params.tags - 태그 배열 (선택)
 */
export const getMapMarkers = async (params = {}) => {
  const response = await axiosInstance.get('/api/map/markers', { params });
  return response.data;
};

/**
 * 가까운 화장실 목록을 조회합니다 (홈 페이지용)
 * 
 * @param {Object} params - 조회 파라미터
 * @param {number} params.lat - 위도 (선택)
 * @param {number} params.lng - 경도 (선택) 
 * @param {number} params.limit - 조회 개수 (선택, 기본값: 16)
 */
export const getNearbyToilets = async (params = {}) => {
  const response = await axiosInstance.get('/api/search/home', { params });
  return response.data;
};