import ReviewHeader from './ReviewHeader';
import ReviewSidebar from './ReviewSidebar';
import ReviewList from './ReviewList';

const ReviewSection = ({ 
  toilet, 
  reviews, 
  ratingDistribution, 
  pagination, 
  onPageChange,
  onSortChange, // onSortChange prop 추가
  currentSort,  // currentSort prop 추가
  isLoading
}) => {

  if (!toilet) return null;

  return (
    <div className="flex flex-col">
      {/* Review Header */}
      <ReviewHeader 
        toilet={toilet} 
        onSortChange={onSortChange} // onSortChange 핸들러 전달
        currentSort={currentSort}   // currentSort 상태 전달
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
          isLoading={isLoading} // isLoading prop 전달
        />
      </div>
    </div>
  );
};

export default ReviewSection;