import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createToilet, uploadToiletImages } from '@/apis/register/registerApi';

/**
 * 화장실 등록 mutation
 */
export const useCreateToilet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createToilet,
    onSuccess: (data) => {
      // 성공 시 관련 쿼리 무효화 (지도 마커, 주변 화장실 등)
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toiletId, imageData }) => uploadToiletImages({ toiletId, imageData }),
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