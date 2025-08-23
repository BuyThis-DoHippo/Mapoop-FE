import { useQuery } from '@tanstack/react-query';
import { getNearbyToilets } from '@/apis/home/homeApi';

// 주변 화장실 query
export const useNearbyToilets = () => {
  return useQuery({
    queryKey: ['nearbyToilets'],
    queryFn: getNearbyToilets,
    staleTime: 5 * 60 * 1000, // 5분 캐싱
  });
};
