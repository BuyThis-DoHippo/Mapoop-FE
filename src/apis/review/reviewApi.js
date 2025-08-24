/**
 * src/apis/review/reviewApi.js
 * 리뷰 관련 모든 API 요청 함수를 관리합니다.
 */
import instance from '@/apis/instance';

/**
 * 리뷰에 첨부할 이미지를 서버에 업로드합니다.
 * @param {object} params - 파라미터 객체
 * @param {number} params.toiletId - 이미지가 속한 화장실의 ID
 * @param {FormData} params.formData - 'files' 키에 이미지 파일들을 담은 FormData
 * @returns {Promise<object>} API 응답 데이터
 */
export const uploadReviewImages = ({ toiletId, formData }) => {
  return instance.post(`/api/toilets/${toiletId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 리뷰 작성 시 사용할 수 있는 전체 태그 목록을 조회합니다.
 * @returns {Promise<object>} API 응답 데이터
 */
// 🚨 여기가 가장 중요한 수정 부분입니다.
// 🚨 API 경로를 '/api/tags/review'로 수정해야 합니다.
export const getReviewTags = () => instance.get('/api/tags/review');

/**
 * 새로운 리뷰를 작성합니다.
 * @param {number} toiletId - 리뷰를 작성할 화장실의 ID
 * @param {object} payload - 리뷰 데이터 (rating, title, content, tagIds, imageUrls)
 * @returns {Promise<object>} API 응답 데이터
 */
export const createReview = (toiletId, payload) =>
  instance.post(`/api/toilets/${toiletId}/reviews`, payload);