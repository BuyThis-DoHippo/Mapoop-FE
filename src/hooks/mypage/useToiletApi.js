import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getMyToilets,
  getToiletById,
  updateToilet,
  uploadToiletImages,
  deleteToiletImage,
  deleteAllToiletImages,
} from '@/apis/mypage/toiletApi';

// 상세 조회
export const useToiletDetail = (id) => {
  return useQuery({
    queryKey: ['toilet', id],
    queryFn: () => getToiletById(id),
    enabled: !!id,
  });
};

// 내가 등록한 화장실 목록 조회 훅
export const useMyToilets = () => {
  return useQuery({
    queryKey: ['myToilets'],
    queryFn: getMyToilets,
  });
};

// 수정
export const useUpdateToilet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, toiletData }) => updateToilet({ id, toiletData }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['toilet', id]);
      queryClient.invalidateQueries(['myToilets']);
    },
  });
};

// 이미지 업로드
export const useUploadToiletImages = () => {
  return useMutation({
    mutationFn: (imageData) => uploadToiletImages(imageData),
    onSuccess: (data) => {
      console.log('✅ 이미지 업로드 성공:', data);
    },
  });
};

// 이미지 단건 삭제
export const useDeleteToiletImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ toiletId, imageId }) =>
      deleteToiletImage({ toiletId, imageId }),
    onSuccess: (_, { toiletId }) => {
      queryClient.invalidateQueries(['toilet', toiletId]);
    },
  });
};

// 이미지 전체 삭제
export const useDeleteAllToiletImages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ toiletId }) => deleteAllToiletImages({ toiletId }),
    onSuccess: (_, { toiletId }) => {
      queryClient.invalidateQueries(['toilet', toiletId]);
    },
  });
};
