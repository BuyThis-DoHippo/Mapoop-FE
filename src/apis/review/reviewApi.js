// src/apis/review/reviewApi.js
import instance from '@/apis/instance';

// 이미지 업로드(리뷰 전용)
export const uploadReviewImages = (formData) =>
  instance.post('/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// 태그 목록
export const getReviewTags = () => instance.get('/api/tags/review');

// 리뷰 생성/수정/삭제
export const createReview = (toiletId, payload) =>
  instance.post(`/api/toilets/${toiletId}/reviews`, payload);
export const updateReview = (reviewId, payload) =>
  instance.patch(`/api/reviews/${reviewId}`, payload);
export const deleteReview = (reviewId) =>
  instance.delete(`/api/reviews/${reviewId}`);

// 조회
export const getToiletReviews = ({ toiletId, page = 1, size = 10, sort = 'latest' }) =>
  instance.get(`/api/toilets/${toiletId}/reviews`, { params: { page, size, sort } });
export const getReviewDetail = (reviewId) => instance.get(`/api/reviews/${reviewId}`);
export const getToiletReviewCount = (toiletId) => instance.get(`/api/toilets/${toiletId}/review-count`);
export const getToiletRating = (toiletId) => instance.get(`/api/toilets/${toiletId}/rating`);
export const getUserReviews = ({ userId, page = 1, size = 10 }) =>
  instance.get(`/api/users/${userId}/reviews`, { params: { page, size } });
