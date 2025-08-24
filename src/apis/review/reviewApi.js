/**
 * src/apis/review/reviewApi.js
 * 리뷰 관련 모든 API 요청 함수를 관리합니다.
 */
import instance from '@/apis/instance';

/**
 * 리뷰에 첨부할 이미지를 서버에 업로드합니다.
 * @param {object} params - 파라미터 객체
 * @param {number} params.toiletId - 이미지가 속한 화장실의 ID
 * @param {FormData} params.formData - 'images' 키에 이미지 파일들을 담은 FormData
 * @returns {Promise<object>} API 응답 데이터
 */
export const uploadReviewImages = ({ toiletId, formData }) => {
  // 수정된 부분: 올바른 리뷰 이미지 업로드 API 사용
  return instance.post(`/api/toilets/${toiletId}/reviews/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 리뷰 작성 시 사용할 수 있는 전체 태그 목록을 조회합니다.
 * @returns {Promise<object>} API 응답 데이터
 */
export const getReviewTags = () => instance.get('/api/tags/review');

/**
 * 새로운 리뷰를 작성합니다.
 * @param {number} toiletId - 리뷰를 작성할 화장실의 ID
 * @param {object} payload - 리뷰 데이터 (rating, title, content, tagIds, imageUrls)
 * @returns {Promise<object>} API 응답 데이터
 */
export const createReview = (toiletId, payload) =>
  instance.post(`/api/toilets/${toiletId}/reviews`, payload);

/**
 * 리뷰 이미지 단건 삭제
 * @param {string} imageUrl - 삭제할 이미지의 S3 URL
 * @returns {Promise<object>} API 응답 데이터
 */
export const deleteReviewImage = (imageUrl) => {
  console.log('삭제할 이미지 URL:', imageUrl);
  console.log('요청 데이터:', { imageUrls: [imageUrl] });
  
  return instance.delete('/api/reviews/images/s3-urls', {
    data: {
      imageUrls: [imageUrl],
    },
  });
};