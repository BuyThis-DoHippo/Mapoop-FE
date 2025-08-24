import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createToilet, uploadToiletImages, deleteToiletImage } from '@/apis/register/registerApi';

/**
 * 화장실 등록 mutation
 */
export const useCreateToilet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createToilet,
    onSuccess: (data) => {
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
 * 화장실 이미지 업로드 mutation
 */
export const useUploadToiletImages = () => {
  return useMutation({
    mutationFn: (imageData) => uploadToiletImages(imageData),
    onSuccess: (data) => {
      console.log('화장실 이미지 업로드 성공:', data);
    },
    onError: (error) => {
      console.error('화장실 이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 파일 크기나 형식을 확인해주세요.');
    },
  });
};

/**
 * 화장실 이미지 삭제 mutation
 */
export const useDeleteToiletImage = () => {
  return useMutation({
    // ✨ 수정된 부분: 파라미터 이름을 imageId로 통일
    mutationFn: (imageId) => deleteToiletImage(imageId),
    onSuccess: (data) => {
      console.log('화장실 이미지 삭제 성공:', data);
    },
    onError: (error) => {
      console.error('화장실 이미지 삭제 실패:', error);
      alert('이미지 삭제에 실패했습니다.');
    },
  });
};