import axiosInstance from '@/apis/instance';

/**
 * 화장실 상세 정보 조회
 * @param {number} toiletId - 화장실 ID
 */
export const getToiletDetail = async (toiletId) => {
  const response = await axiosInstance.get(`/api/toilets/${toiletId}`);
  return response.data;
};

/**
 * 화장실 리뷰 목록 조회
 * @param {number} toiletId - 화장실 ID
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호 (기본값: 1)
 * @param {number} params.size - 페이지 크기 (기본값: 10)
 * @param {string} params.sort - 정렬 방식 (latest, rating_high, rating_low)
 */
export const getToiletReviews = async (toiletId, params = {}) => {
  const { page = 1, size = 10, sort = 'latest' } = params;
  const response = await axiosInstance.get(`/api/toilets/${toiletId}/reviews`, {
    params: { page, size, sort }
  });
  return response.data;
};

/**
 * 화장실 평균 별점 조회
 * @param {number} toiletId - 화장실 ID
 */
export const getToiletRating = async (toiletId) => {
  const response = await axiosInstance.get(`/api/toilets/${toiletId}/rating`);
  return response.data;
};

/**
 * 화장실 리뷰 개수 조회
 * @param {number} toiletId - 화장실 ID
 */
export const getToiletReviewCount = async (toiletId) => {
  const response = await axiosInstance.get(`/api/toilets/${toiletId}/review-count`);
  return response.data;
};

/**
 * 화장실 인기 태그 TOP 3 조회
 * @param {number} toiletId - 화장실 ID
 */
export const getToiletTopTags = async (toiletId) => {
  const response = await axiosInstance.get(`/api/toilets/${toiletId}/top-tags`);
  return response.data;
};

/**
 * 화장실 등록
 * @param {Object} toiletData - 화장실 정보
 */
export const createToilet = async (toiletData) => {
  const response = await axiosInstance.post('/api/toilets', toiletData);
  return response.data;
};

/**
 * 화장실 정보 수정
 * @param {number} toiletId - 화장실 ID
 * @param {Object} toiletData - 수정할 화장실 정보
 */
export const updateToilet = async (toiletId, toiletData) => {
  const response = await axiosInstance.put(`/api/toilets/${toiletId}`, toiletData);
  return response.data;
};

/**
 * 화장실 이미지 업로드
 * @param {number} toiletId - 화장실 ID
 * @param {FormData} imageData - 이미지 파일 데이터
 */
export const uploadToiletImages = async (toiletId, imageData) => {
  const response = await axiosInstance.post(`/api/toilets/${toiletId}/images`, imageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * 화장실 이미지 단건 삭제
 * @param {number} toiletId - 화장실 ID
 * @param {number} imageId - 이미지 ID
 */
export const deleteToiletImage = async (toiletId, imageId) => {
  const response = await axiosInstance.delete(`/api/toilets/${toiletId}/images/${imageId}`);
  return response.data;
};

/**
 * 화장실 이미지 전체 삭제
 * @param {number} toiletId - 화장실 ID
 */
export const deleteAllToiletImages = async (toiletId) => {
  const response = await axiosInstance.delete(`/api/toilets/${toiletId}/images`);
  return response.data;
};