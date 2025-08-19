import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useToiletStore from '@/stores/toiletStore';
import ToiletHeader from '@/components/toiletDetail/ToiletHeader';
import ToiletLocation from '@/components/toiletDetail/ToiletLocation';
import ToiletOperationInfo from '@/components/toiletDetail/ToiletOperationInfo';
import ReviewSection from '@/components/toiletDetail/ReviewSection';

const ToiletDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const {
    currentToilet,
    reviews,
    ratingDistribution,
    pagination,
    currentSort,
    isLoading,
    error,
    fetchToiletDetail,
    fetchReviews,
    resetToiletData
  } = useToiletStore();

  useEffect(() => {
    console.log('ToiletDetailPage useEffect - id:', id);
    if (id) {
      const loadData = async () => {
        await fetchToiletDetail(id);
        await fetchReviews(id, 1, 4);
      };
      loadData();
    }
    
    return () => {
      resetToiletData();
    };
  }, [id]);

  const handlePageChange = (page) => {
    fetchReviews(id, page, 4);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-body1">오류가 발생했습니다: {error}</div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default ToiletDetailPage;