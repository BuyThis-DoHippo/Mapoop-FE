import { create } from 'zustand';
import { mockToiletData, mockReviewsData, calculateRatingDistribution } from '@/mocks/toiletData';

const useToiletStore = create((set, get) => ({
  currentToilet: null,
  reviews: [],
  allReviews: [],
  baseAllReviews: [], // 원본 보관
  ratingDistribution: [],
  pagination: null,
  currentSort: 'latest',
  isLoading: false,
  error: null,

  fetchToiletDetail: async (toiletId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const distribution = calculateRatingDistribution(mockReviewsData.allReviews);

      set({
        currentToilet: mockToiletData,
        baseAllReviews: mockReviewsData.allReviews,
        allReviews: mockReviewsData.allReviews
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), // 초기 최신순 = createdAt 기준
        ratingDistribution: distribution,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  sortAllReviews: (sortType) => {
    const { baseAllReviews } = get();
    if (!baseAllReviews || baseAllReviews.length === 0) return;

    let sorted = baseAllReviews.slice();
    switch (sortType) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 날짜 기준 최신순
        break;
      case 'rating_high':
        sorted.sort((a, b) => {
          const ratingDiff = (b.rating || 0) - (a.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          return new Date(b.createdAt) - new Date(a.createdAt); // 동점 시 최신순
        });
        break;
      case 'rating_low':
        sorted.sort((a, b) => {
          const ratingDiff = (a.rating || 0) - (b.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          return new Date(b.createdAt) - new Date(a.createdAt); // 동점 시 최신순
        });
        break;
      default:
        break;
    }

    set({ allReviews: sorted, currentSort: sortType });
    get().fetchReviews(null, 1, 4);
  },

  fetchReviews: async (toiletId, page = 1, size = 4) => {
    console.log('fetchReviews called - toiletId:', toiletId, 'page:', page, 'size:', size);
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const { allReviews } = get();
      const paginatedReviews = allReviews.slice(startIndex, endIndex);

      set({
        reviews: paginatedReviews,
        pagination: {
          page,
          size,
          total: allReviews.length,
          total_pages: Math.ceil(allReviews.length / size),
        },
        isLoading: false,
      });
    } catch (error) {
      console.error('fetchReviews error:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  resetToiletData: () => {
    set({
      currentToilet: null,
      reviews: [],
      allReviews: [],
      baseAllReviews: [],
      ratingDistribution: [],
      pagination: null,
      currentSort: 'latest',
      error: null,
    });
  },
}));

export default useToiletStore;
