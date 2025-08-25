import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createToilet,
  uploadToiletImages,
  deleteToiletImage,
} from '@/apis/register/registerApi';

/**
 * 화장실 등록 mutation
 */
export const useCreateToilet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createToilet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mapMarkers'] });
      queryClient.invalidateQueries({ queryKey: ['nearbyToilets'] });
    },
    onError: () => {
      alert('화장실 등록에 실패했습니다.');
    },
  });
};

/**
 * 화장실 이미지 업로드 mutation
 */
export const useUploadToiletImages = () => {
  return useMutation({
    mutationFn: (imageData) => uploadToiletImages(imageData),
    onError: () => {
      alert('이미지 업로드에 실패했습니다. 파일 크기나 형식을 확인해주세요.');
    },
  });
};

/**
 * 화장실 이미지 삭제 mutation
 */
export const useDeleteToiletImage = () => {
  return useMutation({
    mutationFn: (imageId) => deleteToiletImage(imageId),
    onError: () => {
      alert('이미지 삭제에 실패했습니다.');
    },
  });
};
