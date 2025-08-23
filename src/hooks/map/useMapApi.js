import { useQuery } from '@tanstack/react-query';
import { getMapMarkers } from '@/apis/map/mapApi';

/**
 * 화장실 마커 데이터를 조회하는 useQuery 훅
 */
export const useMapMarkers = (filters = {}) => {
  return useQuery({
    queryKey: ['mapMarkers', filters],
    queryFn: () => getMapMarkers(filters),
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => data.data.markers, // 실제 마커 배열만 선택하여 반환
    onError: (error) => {
      console.error('마커 데이터 조회 실패:', error);
    },
  });
};