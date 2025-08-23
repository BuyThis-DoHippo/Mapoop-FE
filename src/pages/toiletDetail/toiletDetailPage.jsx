import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  useToiletDetail, 
  useToiletReviews, 
  useToiletRating, 
  useToiletReviewCount, 
  useToiletTopTags 
} from '@/hooks/toilet/useToiletApi';
import ToiletHeader from '@/components/toiletDetail/ToiletHeader';
import ToiletLocation from '@/components/toiletDetail/ToiletLocation';
import ToiletOperationInfo from '@/components/toiletDetail/ToiletOperationInfo';
import ReviewSection from '@/components/toiletDetail/ReviewSection';

const ToiletDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // API 데이터 조회 (기존 useToiletStore 대신)
  const { data: toiletData, isLoading: toiletLoading, error: toiletError } = useToiletDetail(id);
  const { data: reviewsData, isLoading: reviewsLoading } = useToiletReviews(id, { 
    page: currentPage, 
    size: 4, 
    sort: currentSort 
  });
  const { data: ratingData } = useToiletRating(id);
  const { data: reviewCountData } = useToiletReviewCount(id);
  const { data: topTagsData } = useToiletTopTags(id);

  // 기존 컴포넌트가 기대하는 형식으로 데이터 변환
  const currentToilet = toiletData ? {
    id: toiletData.id,
    name: toiletData.name,
    type: toiletData.type,
    location: toiletData.location,
    rating: {
      avg_rating: ratingData || toiletData.rating?.avgRating || 0,
      total_reviews: reviewCountData || toiletData.rating?.totalReviews || 0
    },
    hours: toiletData.hours,
    description: toiletData.description,
    particulars: toiletData.particulars,
    tags: toiletData.tags || [],
    images: toiletData.images || [],
    distance: "도보 5분",
    isPartnership: toiletData.isPartnership
  } : null;

  const reviews = reviewsData?.reviews?.map(review => ({
    id: review.reviewId,
    user: {
      name: review.userName
    },
    rating: review.rating,
    content: review.content,
    created_at: new Date(review.createdAt).toLocaleDateString(),
    tags: review.tags?.map(tag => tag.tagName) || [],
    images: review.imageUrls || []
  })) || [];

  // 평점 분포 계산 (API에서 제공하지 않으므로 임시 데이터)
  const ratingDistribution = [
    { rating: 5, count: Math.floor(Math.random() * 10), barWidth: 200 },
    { rating: 4, count: Math.floor(Math.random() * 8), barWidth: 150 },
    { rating: 3, count: Math.floor(Math.random() * 5), barWidth: 100 },
    { rating: 2, count: Math.floor(Math.random() * 3), barWidth: 50 },
    { rating: 1, count: Math.floor(Math.random() * 2), barWidth: 25 }
  ];

  const pagination = reviewsData ? {
    page: reviewsData.currentPage,
    size: 4,
    total: reviewsData.totalElements,
    total_pages: reviewsData.totalPages,
  } : null;

  // 기존 fetchReviews 함수를 대체하는 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortType) => {
    setCurrentSort(sortType);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  // 로딩 상태 (기존과 동일)
  if (toiletLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  // 에러 상태 (기존과 동일)  
  if (toiletError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-body1">오류가 발생했습니다: {toiletError.message}</div>
      </div>
    );
  }

  // 데이터가 없는 경우 (기존과 동일)
  if (!currentToilet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-5 text-body1">화장실 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 기존 JSX 구조 그대로 유지
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="flex flex-col">
          {/* Toilet Info Section */}
          <div className="flex flex-col gap-10">
            {/* Title and Rating */}
            <ToiletHeader toilet={currentToilet} />

            {/* Location Section */}
            <ToiletLocation toilet={currentToilet} />
          </div>

          {/* Hours and Special Info - 72px gap */}
          <div className="mt-[72px]">
            <ToiletOperationInfo toilet={currentToilet} />
          </div>

          {/* Divider Line - 56px below ToiletOperation */}
          <div className="mt-[56px] mb-[56px]">
            <div className="w-[1196px] h-px bg-gray-1"></div>
          </div>

          {/* Reviews Section */}
          <ReviewSection 
            toilet={currentToilet}
            reviews={reviews}
            ratingDistribution={ratingDistribution}
            pagination={pagination}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
            currentSort={currentSort}
            isLoading={reviewsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ToiletDetailPage;