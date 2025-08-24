import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/apis/mypage/profileApi';

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
};
