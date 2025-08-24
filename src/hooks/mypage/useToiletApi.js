import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyToilets,
  getToiletById,
  createToilet,
  updateToilet,
  uploadToiletImages,
  deleteToiletImage,
  deleteAllToiletImages,
  updateToiletWithImages,
} from '@/apis/mypage/toiletApi';

// 내가 등록한 화장실 목록 조회
export const useMyToilets = () => {
  return useQuery({
    queryKey: ['myToilets'],
    queryFn: getMyToilets,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// 화장실 상세 조회
export const useToiletDetail = (toiletId) => {
  return useQuery({
    queryKey: ['toilet', toiletId],
    queryFn: () => getToiletById(toiletId),
    enabled: !!toiletId,
  });
};

// 화장실 등록
export const useCreateToilet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createToilet,
    onSuccess: () => {
      queryClient.invalidateQueries(['myToilets']);
    },
  });
};

// 화장실 수정 (기존)
export const useUpdateToilet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateToilet,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['toilet', id]);
      queryClient.invalidateQueries(['myToilets']);
    },
  });
};

// 이미지 업로드
export const useUploadImages = (toiletId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (files) => uploadToiletImages(toiletId, files),
    onSuccess: () => {
      queryClient.invalidateQueries(['toilet', toiletId]);
    },
  });
};

// 이미지 단건 삭제
export const useDeleteImage = (toiletId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId) => deleteToiletImage(toiletId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries(['toilet', toiletId]);
    },
  });
};

// 이미지 전체 삭제
export const useDeleteAllImages = (toiletId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllToiletImages(toiletId),
    onSuccess: () => {
      queryClient.invalidateQueries(['toilet', toiletId]);
    },
  });
};

// 화장실 수정 (imageIds 포함)
export const useUpdateToiletWithImages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, toiletData, imageIds }) =>
      updateToiletWithImages({ id, toiletData, imageIds }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['toilet', id]);
      queryClient.invalidateQueries(['myToilets']);
    },
  });
};
