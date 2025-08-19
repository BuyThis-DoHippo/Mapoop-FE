// components/toiletDetail/ReviewSection.jsx
import ReviewHeader from './ReviewHeader';
import ReviewSidebar from './ReviewSidebar';
import ReviewList from './ReviewList';
import useToiletStore from '@/stores/toiletStore';

const ReviewSection = ({ 
  toilet, 
  reviews, 
  ratingDistribution, 
  pagination, 
  onPageChange 
}) => {
  const { currentSort, sortAllReviews } = useToiletStore();

  const handleSortChange = (sortType) => {
    console.log('Sort changed to:', sortType);
    sortAllReviews(sortType);
  };

  if (!toilet) return null;

  return (
    <div className="flex flex-col">
      {/* Review Header */}
      <ReviewHeader 
        toilet={toilet} 
        onSortChange={handleSortChange}
        currentSort={currentSort}
      />

      {/* Main Reviews Content - 48px below ReviewHeader */}
      <div className="mt-[48px] flex gap-20">
        {/* Left Sidebar */}
        <ReviewSidebar 
          toilet={toilet} 
          ratingDistribution={ratingDistribution} 
        />

        {/* Right Reviews List */}
        <ReviewList 
          reviews={reviews}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ReviewSection;