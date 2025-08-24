/**
 * src/hooks/review/useReviewApi.js
 * 리뷰 관련 API를 호출하는 react-query 훅을 관리합니다.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as reviewApi from '@/apis/review/reviewApi';

/**
 * 리뷰 이미지를 업로드하는 뮤테이션 훅
 */
export const useUploadReviewImages = () => {
  return useMutation({
    mutationFn: reviewApi.uploadReviewImages,
    onError: (error) => {
      console.error("Image upload failed:", error);
      alert("이미지 업로드에 실패했습니다. 파일 크기(최대 10MB)나 형식을 확인해주세요.");
    }
  });
};

/**
 * 리뷰 작성용 태그 목록을 조회하는 쿼리 훅
 */
export const useReviewTags = (options = {}) =>
  useQuery({
    queryKey: ['reviewTags'],
    queryFn: async () => {
      const response = await reviewApi.getReviewTags();
      return response.data.data; // 실제 태그 배열 반환
    },
    staleTime: 5 * 60 * 1000, // 5분간 신선한 데이터로 간주
    ...options,
  });

/**
 * 리뷰를 생성하는 뮤테이션 훅
 * @param {number} toiletId - 리뷰를 작성할 화장실 ID
 */
export const useCreateReview = (toiletId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => reviewApi.createReview(toiletId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toiletReviews', toiletId] });
      queryClient.invalidateQueries({ queryKey: ['toilet', toiletId] });
    },
    onError: (error) => {
      console.error("Failed to create review:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  });
};

/**
 * ✨ 추가된 부분: 리뷰 이미지 삭제를 위한 뮤테이션 훅
 */
export const useDeleteReviewImage = () => {
  return useMutation({
    mutationFn: (imageUrl) => reviewApi.deleteReviewImage(imageUrl),
    onSuccess: () => {
      console.log('리뷰 이미지 삭제 성공');
    },
    onError: (error) => {
      console.error("Failed to delete review image:", error);
      alert("이미지 삭제 중 오류가 발생했습니다.");
    }
  });
};