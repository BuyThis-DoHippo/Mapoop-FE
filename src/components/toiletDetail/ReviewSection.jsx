// components/toiletDetail/ReviewSection.jsx
import ReviewHeader from './ReviewHeader';
import ReviewSidebar from './ReviewSidebar';
import ReviewList from './ReviewList';

const ReviewSection = ({ 
  toilet, 
  reviews, 
  ratingDistribution, 
  pagination, 
  onPageChange 
}) => {
  if (!toilet) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Review Header */}
      <ReviewHeader toilet={toilet} />

      {/* Main Reviews Content - Left Sidebar + Right Reviews */}
      <div className="flex gap-20">
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