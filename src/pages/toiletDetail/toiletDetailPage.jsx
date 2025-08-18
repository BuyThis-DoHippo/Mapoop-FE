import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useToiletStore from '@/stores/toiletStore';
import StarBlue from '@/assets/svg/toiletDetail/star-blue.svg?react';
import StarGray from '@/assets/svg/toiletDetail/star-gray.svg?react';
import Arrow from '@/assets/svg/arrow.svg?react';
import ArrowDown from '@/assets/svg/toiletDetail/arrow-down.svg?react';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';
import ToiletHeader from '@/components/toiletDetail/ToiletHeader';

const ToiletDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 5]); // 현재 표시되는 페이지 범위
  
  const {
    currentToilet,
    reviews,
    allReviews,
    ratingDistribution,
    pagination,
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

  // 디버깅용 로그 추가
  console.log('ToiletDetailPage render - reviews:', reviews);
  console.log('ToiletDetailPage render - currentToilet:', currentToilet);
  console.log('ToiletDetailPage render - ratingDistribution:', ratingDistribution);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchReviews(id, page, 4);
    
    // 페이지 범위 조정
    if (page > pageRange[1]) {
      setPageRange([page - 4, page]);
    } else if (page < pageRange[0]) {
      setPageRange([page, page + 4]);
    }
  };

  const renderStars = (rating, size = 'small') => {
    const sizeClasses = {
      large: 'w-[34px] h-[34px]',   // 소코아 홍대점 화장실 밑 별점
      medium: 'w-[29px] h-[29px]',  // 화장실 리뷰 평점 평균 별점
      small: 'w-[22px] h-[22px]'    // 리뷰 카드 안 별점
    };
    
    return Array.from({ length: 5 }, (_, index) => {
      const StarComponent = index < Math.floor(rating) ? StarBlue : StarGray;
      return (
        <StarComponent 
          key={index}
          className={sizeClasses[size]}
        />
      );
    });
  };

  const renderRatingDistribution = () => {
    if (!ratingDistribution || ratingDistribution.length === 0) return null;
    
    return (
      <div className="flex flex-col gap-4">
        {ratingDistribution.map((item) => (
          <div key={item.rating} className="flex items-center justify-between gap-8">
            <span className="text-body2 text-gray-8 w-6">{item.rating}점</span>
            <div className="flex-1 h-[17px] bg-main-3 rounded-full overflow-hidden">
              <div 
                className="h-full bg-main rounded-full transition-all duration-300"
                style={{ width: `${item.barWidth}px`, maxWidth: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    );
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
          className={`w-10 h-10 rounded flex items-center justify-center text-body2 ${
            currentPage === i 
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
            className="w-10 h-10 rounded flex items-center justify-center text-body2 bg-white text-gray-7 border border-gray-2"
          >
            <Arrow className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  const renderToiletImages = () => {
    if (!currentToilet?.images || currentToilet.images.length === 0) return null;
    
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-body1-bold text-black">화장실 사진</h3>
        
        {/* 이미지 레이아웃 */}
        <div className="flex gap-4">
          {/* 큰 이미지 */}
          <div className="w-[385px] h-[274px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-4xl">🚽</div>
          </div>
          
          {/* 오른쪽 이미지들 */}
          <div className="flex flex-col gap-4">
            {/* 세로 긴 이미지 */}
            <div className="w-[181px] h-[290px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-2xl">🚽</div>
            </div>
          </div>
          
          {/* 작은 이미지 2개 */}
          <div className="flex flex-col gap-4">
            <div className="w-[188px] h-[137px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-xl">🚽</div>
            </div>
            <div className="w-[188px] h-[137px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-xl">🚽</div>
            </div>
          </div>
        </div>
        
        <button className="text-body1 self-end">
          사진 더보기 →
        </button>
      </div>
    );
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
      {/* Navigation */}
      <div className="w-full bg-white border-b border-gray-1 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-6 h-6 text-gray-7"
          >
            ←
          </button>
          <div className="text-heading3-bold text-gray-9">화장실 정보</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="flex flex-col gap-16">
          {/* Toilet Info Section */}
          <div className="flex flex-col gap-10">
            {/* Title and Rating */}
            <ToiletHeader toilet={currentToilet} />

            {/* Location Section */}
            <div className="flex flex-col gap-6">
              <h2 className="text-heading3-bold text-black">화장실 위치</h2>
              <div className="flex gap-10">
                {/* Map */}
                <div className="w-[684px] h-80 relative bg-gray-1 rounded-[10px] border border-gray-2 overflow-hidden flex items-center justify-center">
                  <div className="text-heading3-regular text-gray-5">화장실 지도</div>
                  {/* Map marker simulation */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-14 h-16 relative">
                      <div className="w-12 h-12 bg-amber-500 rounded-full border-4 border-orange-500 flex items-center justify-center">
                        <div className="w-5 h-6 bg-white rounded flex items-center justify-center text-amber-500 text-xs font-bold">
                          🚽
                        </div>
                      </div>
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-body2-bold text-black whitespace-nowrap">
                        소코아 홍대점
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="w-64 flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-body1-bold text-black">주소</h3>
                    <div className="flex flex-col gap-2">
                      <p className="text-body1 text-black">{currentToilet.location.address}</p>
                      <p className="text-body1 text-black">
                        <span className="text-red-900 font-bold">{currentToilet.subwayInfo}</span>
                        <span className="text-black"> {currentToilet.distance}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-body1-bold text-black">장소 설명</h3>
                    <p className="text-body1 text-black">{currentToilet.description}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-body1-bold text-black">화장실 태그</h3>
                    <div className="flex gap-4">
                      {currentToilet.tags.map((tag, index) => (
                        <div key={index} className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center">
                          <span className="text-body2 text-gray-8">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hours and Special Info */}
          <div className="flex gap-7">
            <div className="w-[580px] px-10 py-8 bg-white rounded-[10px] border border-gray-3 flex flex-col gap-2">
              <div className="flex flex-col gap-6">
                <h3 className="text-body1-bold text-gray-10">영업시간</h3>
                <div className="flex flex-col gap-4">
                  <p className="text-body1-bold text-green-500">
                    {currentToilet.hours.isOpenNow ? '영업중' : '영업종료'}
                  </p>
                  <p className="text-body1 text-gray-8">
                    매일 {currentToilet.hours.openTime.slice(0, 5)}~{currentToilet.hours.closeTime.slice(0, 5)}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[580px] px-10 py-8 bg-white rounded-[10px] border border-gray-3 flex flex-col gap-2">
              <div className="flex flex-col gap-6">
                <h3 className="text-body1-bold text-gray-10">화장실 특수사항</h3>
                <div className="flex flex-col gap-4">
                  <p className="text-body1 text-gray-8">{currentToilet.particulars}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="flex flex-col gap-6">
            {/* Review Header */}
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-6">
                <h2 className="text-heading3-bold text-black">화장실 리뷰</h2>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-6">
                    <span className="text-heading3-bold text-black">평점</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {renderStars(currentToilet.rating.avg_rating, 'medium')}
                      </div>
                      <span className="text-heading3-bold text-black">{currentToilet.rating.avg_rating}</span>
                    </div>
                  </div>
                  <span className="text-body1 text-black">({currentToilet.rating.total_reviews}건의 리뷰)</span>
                </div>
              </div>
              
              <div className="h-11 px-8 py-2.5 bg-white rounded-[40px] border border-gray-4 flex items-center gap-4">
                <span className="text-body1 text-gray-6">최신순</span>
                <ArrowDown/>
              </div>
            </div>

            {/* Main Reviews Content - Left Sidebar + Right Reviews */}
            <div className="flex gap-20">
              {/* Left Sidebar */}
              <div className="w-[385px] flex flex-col gap-8">
                {/* Rating Distribution */}
                <div className="px-8 py-10 bg-white rounded-[10px] border border-gray-2 flex flex-col gap-12">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-body2-bold text-gray-8">총 평점</h3>
                    </div>
                    {renderRatingDistribution()}
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-body2-bold text-gray-8">화장실 태그</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {currentToilet.tags.map((tag, index) => (
                        <div key={index} className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center">
                          <span className="text-body2 text-gray-8">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Write Review Button */}
                <button 
                  onClick={() => navigate('/review-toilet')}
                  className="w-full px-24 py-9 bg-main rounded-[10px] flex items-center justify-between gap-2 text-heading3-bold text-white"
                >
                  <Pencil/>
                  <span>리뷰 작성하기</span>
                </button>

                {/* Toilet Images */}
                {renderToiletImages()}
              </div>

              {/* Right Reviews List */}
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
                                    {renderStars(review.rating || 0, 'small')}
                                  </div>
                                </div>
                                <span className="text-body2 text-gray-6">{review.created_at}</span>
                              </div>
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
                              
                              {review.images && review.images.length > 0 && (
                                <div className="flex gap-2">
                                  {review.images.map((image, imageIndex) => (
                                    <div key={imageIndex} className="w-20 h-20 bg-gray-1 rounded overflow-hidden flex items-center justify-center">
                                      <div className="text-lg">📷</div>
                                    </div>
                                  ))}
                                </div>
                              )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToiletDetailPage;