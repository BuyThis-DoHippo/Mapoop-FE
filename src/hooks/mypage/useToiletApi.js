import { useQuery } from '@tanstack/react-query';
import { getMyToilets } from '@/apis/mypage/toiletApi';

export const useMyToilets = () => {
  return useQuery({
    queryKey: ['myToilets'],
    queryFn: getMyToilets,
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
  });
};
