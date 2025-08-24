import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getToiletDetail, 
  getToiletReviews, 
  getToiletRating, 
  getToiletReviewCount, 
  getToiletTopTags,
  getToiletRatingDistribution,
  createToilet,
  updateToilet,
  uploadToiletImages,
  deleteToiletImage,
  deleteAllToiletImages
} from '@/apis/toilet/toiletApi';

/**
 * 화장실 상세 정보 조회 query
 */
export const useToiletDetail = (toiletId) => {
  return useQuery({
    queryKey: ['toilet', toiletId],
    queryFn: () => getToiletDetail(toiletId),
    enabled: !!toiletId,
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => data.data,
    onError: (error) => {
      console.error('화장실 상세 정보 조회 실패:', error);
    },
  });
};

/**
 * 화장실 리뷰 목록 조회 query
 */
export const useToiletReviews = (toiletId, params = {}) => {
  return useQuery({
    queryKey: ['toiletReviews', toiletId, params],
    queryFn: () => getToiletReviews(toiletId, params),
    enabled: !!toiletId,
    staleTime: 3 * 60 * 1000, // 3분
    select: (data) => data.data,
    onError: (error) => {
      console.error('화장실 리뷰 조회 실패:', error);
    },
  });
};

/**
 * 화장실 평균 별점 조회 query
 */
export const useToiletRating = (toiletId) => {
  return useQuery({
    queryKey: ['toiletRating', toiletId],
    queryFn: () => getToiletRating(toiletId),
    enabled: !!toiletId,
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => data.data,
    onError: (error) => {
      console.error('화장실 평균 별점 조회 실패:', error);
    },
  });
};

/**
 * 화장실 리뷰 개수 조회 query
 */
export const useToiletReviewCount = (toiletId) => {
  return useQuery({
    queryKey: ['toiletReviewCount', toiletId],
    queryFn: () => getToiletReviewCount(toiletId),
    enabled: !!toiletId,
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => data.data,
    onError: (error) => {
      console.error('화장실 리뷰 개수 조회 실패:', error);
    },
  });
};

/**
 * 화장실 인기 태그 TOP 3 조회 query
 */
export const useToiletTopTags = (toiletId) => {
  return useQuery({
    queryKey: ['toiletTopTags', toiletId],
    queryFn: () => getToiletTopTags(toiletId),
    enabled: !!toiletId,
    staleTime: 10 * 60 * 1000, // 10분
    select: (data) => data.data,
    onError: (error) => {
      console.error('화장실 인기 태그 조회 실패:', error);
    },
  });
};

/**
 * 화장실 평점 분포 조회 query
 */
export const useToiletRatingDistribution = (toiletId) => {
  return useQuery({
    queryKey: ['toiletRatingDistribution', toiletId],
    queryFn: () => getToiletRatingDistribution(toiletId),
    enabled: !!toiletId,
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => data.data,
    onError: (error) => {
      console.error('화장실 평점 분포 조회 실패:', error);
    },
  });
};

/**
 * 화장실 등록 mutation
 */
export const useCreateToilet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createToilet,
    onSuccess: (data) => {
      // 지도 마커 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['mapMarkers'] });
      queryClient.invalidateQueries({ queryKey: ['nearbyToilets'] });
      console.log('화장실 등록 성공:', data);
    },
    onError: (error) => {
      console.error('화장실 등록 실패:', error);
    },
  });
};

/**
 * 화장실 정보 수정 mutation
 */
export const useUpdateToilet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toiletId, toiletData }) => updateToilet(toiletId, toiletData),
    onSuccess: (data, variables) => {
      // 해당 화장실 정보 새로고침
      queryClient.invalidateQueries({ queryKey: ['toilet', variables.toiletId] });
      queryClient.invalidateQueries({ queryKey: ['mapMarkers'] });
      console.log('화장실 정보 수정 성공:', data);
    },
    onError: (error) => {
      console.error('화장실 정보 수정 실패:', error);
    },
  });
};

/**
 * 화장실 이미지 업로드 mutation
 */
export const useUploadToiletImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toiletId, imageData }) => uploadToiletImages(toiletId, imageData),
    onSuccess: (data, variables) => {
      // 해당 화장실 정보 새로고침
      queryClient.invalidateQueries({ queryKey: ['toilet', variables.toiletId] });
      console.log('화장실 이미지 업로드 성공:', data);
    },
    onError: (error) => {
      console.error('화장실 이미지 업로드 실패:', error);
    },
  });
};

/**
 * 화장실 이미지 삭제 mutation
 */
export const useDeleteToiletImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toiletId, imageId }) => deleteToiletImage(toiletId, imageId),
    onSuccess: (data, variables) => {
      // 해당 화장실 정보 새로고침
      queryClient.invalidateQueries({ queryKey: ['toilet', variables.toiletId] });
      console.log('화장실 이미지 삭제 성공:', data);
    },
    onError: (error) => {
      console.error('화장실 이미지 삭제 실패:', error);
    },
  });
};