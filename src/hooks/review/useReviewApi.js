import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  uploadReviewImages,
  getReviewTags,
  createReview,
  updateReview,
  deleteReview,
  getToiletReviews,
  getReviewDetail,
  getToiletReviewCount,
  getToiletRating,
  getUserReviews,
} from '@/apis/review/reviewApi';

// 이미지 업로드
export const useUploadReviewImages = () =>
  useMutation({
    mutationFn: async (formData) => {
      const r = await uploadReviewImages(formData);
      return r?.data?.data?.imageUrls ?? [];
    },
  });

// 태그(문자열/객체 혼용 대응)
const normalizeTags = (raw) => {
  const src = raw?.data ?? raw;
  const cast = (arr) =>
    (arr ?? []).map((t, i) =>
      typeof t === 'string' ? { tagId: undefined, tagName: t, _k: `${t}-${i}` } : { tagId: t.tagId ?? t.id, tagName: t.tagName ?? t.name }
    );
  const basic = cast(src?.basicTags);
  const facility = cast(src?.facilityTags);
  return { basicTags: basic, facilityTags: facility, all: [...basic, ...facility] };
};

export const useReviewTags = (options = {}) =>
  useQuery({
    queryKey: ['review', 'tags'],
    queryFn: async () => {
      const r = await getReviewTags();
      return normalizeTags(r.data);
    },
    staleTime: 10 * 60 * 1000,
    ...options,
  });

// 생성/수정/삭제
export const useCreateReview = (toiletId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const r = await createReview(toiletId, payload);
      return r?.data?.data ?? r?.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'reviews'] });
      qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'review-count'] });
      qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'rating'] });
    },
  });
};
export const useUpdateReview = (reviewId, toiletId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const r = await updateReview(reviewId, payload);
      return r?.data?.data ?? r?.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['review', reviewId] });
      if (toiletId) {
        qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'reviews'] });
        qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'review-count'] });
        qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'rating'] });
      }
    },
  });
};
export const useDeleteReview = (reviewId, toiletId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => deleteReview(reviewId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['review', reviewId] });
      if (toiletId) {
        qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'reviews'] });
        qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'review-count'] });
        qc.invalidateQueries({ queryKey: ['toilet', toiletId, 'rating'] });
      }
    },
  });
};

// 조회
export const useToiletReviews = ({ toiletId, page = 1, size = 10, sort = 'latest' }, options = {}) =>
  useQuery({
    queryKey: ['toilet', toiletId, 'reviews', { page, size, sort }],
    queryFn: async () => {
      const r = await getToiletReviews({ toiletId, page, size, sort });
      return r?.data?.data ?? r?.data;
    },
    enabled: !!toiletId,
    ...options,
  });
export const useReviewDetail = (reviewId, options = {}) =>
  useQuery({
    queryKey: ['review', reviewId],
    queryFn: async () => {
      const r = await getReviewDetail(reviewId);
      return r?.data?.data ?? r?.data;
    },
    enabled: !!reviewId,
    ...options,
  });
export const useToiletReviewCount = (toiletId, options = {}) =>
  useQuery({
    queryKey: ['toilet', toiletId, 'review-count'],
    queryFn: async () => {
      const r = await getToiletReviewCount(toiletId);
      return r?.data?.data ?? r?.data;
    },
    enabled: !!toiletId,
    ...options,
  });
export const useToiletRating = (toiletId, options = {}) =>
  useQuery({
    queryKey: ['toilet', toiletId, 'rating'],
    queryFn: async () => {
      const r = await getToiletRating(toiletId);
      return r?.data?.data ?? r?.data;
    },
    enabled: !!toiletId,
    ...options,
  });
export const useUserReviews = ({ userId, page = 1, size = 10 }, options = {}) =>
  useQuery({
    queryKey: ['user', userId, 'reviews', { page, size }],
    queryFn: async () => {
      const r = await getUserReviews({ userId, page, size });
      return r?.data?.data ?? r?.data;
    },
    enabled: !!userId,
    ...options,
  });
