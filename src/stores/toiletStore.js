// stores/toiletStore.js
import { create } from 'zustand';
import { mockToiletData, mockReviewsData, calculateRatingDistribution } from '@/mocks/toiletData';

const useToiletStore = create((set, get) => ({
  // 상태
  currentToilet: null,
  reviews: [],
  allReviews: [],
  ratingDistribution: [],
  pagination: null,
  isLoading: false,
  error: null,

  // 화장실 상세 정보 조회
  fetchToiletDetail: async (toiletId) => {
    set({ isLoading: true, error: null });
    
    try {
      // 실제 API 호출 시 이 부분을 대체
      await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
      
      // 전체 리뷰 데이터로 별점 분포 계산
      const distribution = calculateRatingDistribution(mockReviewsData.allReviews);
      
      set({ 
        currentToilet: mockToiletData,
        allReviews: mockReviewsData.allReviews,
        ratingDistribution: distribution,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      });
    }
  },

  // 리뷰 목록 조회
  fetchReviews: async (toiletId, page = 1, size = 4) => {
    console.log('fetchReviews called - toiletId:', toiletId, 'page:', page, 'size:', size);
    set({ isLoading: true, error: null });
    
    try {
      // 실제 API 호출 시 이 부분을 대체
      await new Promise(resolve => setTimeout(resolve, 300)); // 로딩 시뮬레이션
      
      // 페이지네이션 시뮬레이션
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      
      // 직접 mockReviewsData.allReviews 사용
      const allReviews = mockReviewsData.allReviews;
      
      console.log('fetchReviews - allReviews length:', allReviews.length);
      console.log('fetchReviews - startIndex:', startIndex, 'endIndex:', endIndex);
      
      const paginatedReviews = allReviews.slice(startIndex, endIndex);
      
      console.log('fetchReviews - paginatedReviews:', paginatedReviews);
      
      set({ 
        reviews: paginatedReviews,
        pagination: {
          page,
          size,
          total: allReviews.length,
          total_pages: Math.ceil(allReviews.length / size)
        },
        isLoading: false 
      });
    } catch (error) {
      console.error('fetchReviews error:', error);
      set({ 
        error: error.message,
        isLoading: false 
      });
    }
  },

  // 상태 초기화
  resetToiletData: () => {
    set({
      currentToilet: null,
      reviews: [],
      allReviews: [],
      ratingDistribution: [],
      pagination: null,
      error: null
    });
  }
}));

export default useToiletStore;