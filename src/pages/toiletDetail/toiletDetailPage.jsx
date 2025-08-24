import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  useToiletDetail, 
  useToiletReviews, 
  useToiletRatingDistribution
} from '@/hooks/toilet/useToiletApi';
import ToiletHeader from '@/components/toiletDetail/ToiletHeader';
import ToiletLocation from '@/components/toiletDetail/ToiletLocation';
import ToiletOperationInfo from '@/components/toiletDetail/ToiletOperationInfo';
import ReviewSection from '@/components/toiletDetail/ReviewSection';

const ToiletDetailPage = () => {
  const { id } = useParams();
  console.log('페이지에 전달된 toilet ID:', id);
  const [currentSort, setCurrentSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // API 데이터 조회
  const { data: toiletData, isLoading: toiletLoading, error: toiletError } = useToiletDetail(id);
  const { data: reviewsData, isLoading: reviewsLoading } = useToiletReviews(id, { 
    page: currentPage, 
    size: 4, 
    sort: currentSort 
  });
  const { data: ratingDistributionData } = useToiletRatingDistribution(id);

  // 컴포넌트에 전달할 데이터 가공
  const currentToilet = toiletData ? {
    ...toiletData,
    rating: {
      avg_rating: toiletData.rating?.avgRating || 0,
      total_reviews: ratingDistributionData?.totalReviews || toiletData.rating?.totalReviews || 0
    }
  } : null;

  const reviews = reviewsData?.reviews?.map(review => ({
    id: review.reviewId,
    user: { name: review.userName },
    rating: review.rating,
    content: review.content,
    created_at: new Date(review.createdAt).toLocaleDateString(),
    tags: review.tags?.map(tag => tag.tagName) || [],
    images: review.imageUrls || []
  })) || [];
  
  const ratingDistribution = ratingDistributionData?.distribution?.map(item => {
      const maxCount = Math.max(...(ratingDistributionData.distribution.map(d => d.count) || [0]));
      return {
          ...item,
          barWidth: maxCount > 0 ? Math.round((item.count / maxCount) * 217) : 0,
      };
  }) || [];


  const pagination = reviewsData ? {
    page: reviewsData.currentPage,
    size: 4,
    total: reviewsData.totalElements,
    total_pages: reviewsData.totalPages,
  } : null;

  // 페이지 및 정렬 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortType) => {
    setCurrentSort(sortType);
    setCurrentPage(1);
  };

  // 로딩 및 에러 처리
  if (toiletLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (toiletError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-body1">오류가 발생했습니다: {toiletError.message}</div>
      </div>
    );
  }

  if (!currentToilet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-5 text-body1">화장실 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col">
          <div className="flex flex-col gap-10">
            <ToiletHeader toilet={currentToilet} />
            <ToiletLocation toilet={currentToilet} />
          </div>

          <div className="mt-[72px]">
            <ToiletOperationInfo toilet={currentToilet} />
          </div>

          <div className="mt-[56px] mb-[56px]">
            <div className="w-[1196px] h-px bg-gray-1"></div>
          </div>

          <ReviewSection 
            toilet={currentToilet}
            reviews={reviews}
            ratingDistribution={ratingDistribution}
            pagination={pagination}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange} // onSortChange 전달
            currentSort={currentSort}
            isLoading={reviewsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ToiletDetailPage;