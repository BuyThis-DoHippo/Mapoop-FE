import { useQuery } from '@tanstack/react-query';
import { fetchReviewToilets } from '@/apis/review/reviewApiList';

export const useReviewToilets = (params = {}, options = {}) =>
  useQuery({
    queryKey: ['reviewToilets', params],
    queryFn: () => fetchReviewToilets(params),
    ...options,
  });
