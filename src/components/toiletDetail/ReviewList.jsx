import { useState, useEffect } from 'react';
import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';

const ReviewList = ({ reviews, pagination, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 5]);

  // pagination.page와 currentPage 동기화
  useEffect(() => {
    if (pagination?.page) {
      setCurrentPage(pagination.page);
    }
  }, [pagination?.page]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const StarComponent = index < Math.floor(rating) ? StarBlue : StarGray;
      return (
        <StarComponent 
          key={index}
          className="w-[22px] h-[22px]"
        />
      );
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
    
    // 페이지 범위 조정
    if (page > pageRange[1]) {
      setPageRange([page - 4, page]);
    } else if (page < pageRange[0]) {
      setPageRange([page, page + 4]);
    }
  };

  const renderPagination = () => {
    if (!pagination) return null;
    
    const pages = [];
    const [start, end] = pageRange;
    
    // 현재 범위의 페이지 버튼들
    for (let i = start; i <= Math.min(end, pagination.total_pages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-[60px] h-[60px] rounded flex items-center justify-center text-heading3-regular ${
            pagination.page === i 
              ? 'bg-main text-white' 
              : 'bg-white text-gray-7 border border-gray-2'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="flex justify-center items-center gap-2 mt-10">
        {pages}
        {end < pagination.total_pages && (
          <button
            onClick={() => {
              const nextPage = end + 1;
              setPageRange([nextPage - 4, nextPage]);
              handlePageChange(nextPage);
            }}
            className="w-[60px] h-[60px] rounded flex items-center justify-center bg-white text-gray-7 border border-gray-2"
          >
            <Arrow className="w-6 h-6" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-[720px] flex flex-col">
      {/* Reviews List */}
      <div className="flex flex-col">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`px-14 py-12 bg-white ${
                index === 0 ? 'border-t' : ''
              } border-b border-gray-3 flex flex-col`}
            >
              <div className="flex items-start gap-6">
                <div className="w-11 h-11 bg-main rounded-full flex items-center justify-center">
                  <span className="text-white text-body2-bold">
                    {review.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                
                <div className="w-[535px] flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-body1-bold text-gray-10">{review.user?.name || '익명'}</span>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating || 0)}
                        </div>
                      </div>
                      <span className="text-body2 text-gray-6">{review.created_at}</span>
                    </div>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="w-[180px] h-[180px] bg-gray-1 rounded overflow-hidden flex items-center justify-center">
                            <div className="text-lg">📷</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-body1 text-gray-6">{review.content}</p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      {(review.tags || []).map((tag, tagIndex) => (
                        <div key={tagIndex} className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center">
                          <span className="text-body2 text-gray-8">{tag}</span>
                        </div>
                      ))}
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-14 py-12 text-center text-gray-5">
            리뷰가 없습니다.
          </div>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default ReviewList;