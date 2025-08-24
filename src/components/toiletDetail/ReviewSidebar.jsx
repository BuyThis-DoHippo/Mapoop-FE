// components/toiletDetail/ReviewSidebar.jsx
import { useNavigate } from 'react-router-dom';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';
import ToiletPic from '@/assets/svg/NearbyToilet.svg?react';

const ReviewSidebar = ({ toilet, ratingDistribution }) => {
  const navigate = useNavigate();

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

  const renderToiletImages = () => {
    if (!toilet?.images || toilet.images.length === 0) return null;
    
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-body1-bold text-black">화장실 사진</h3>
        
        {/* 이미지 레이아웃 - L자 형태 */}
        <div className="w-[385px]">
          {/* 첫 번째 줄: 큰 이미지 */}
          <div className="w-[385px] h-[274px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center mb-4">
            <ToiletPic className="w-full h-full object-cover" />
          </div>
          
          {/* 두 번째 줄: 세로 긴 이미지 + 작은 이미지 2개 */}
          <div className="flex gap-4">
            {/* 세로 긴 이미지 */}
            <div className="w-[181px] h-[290px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
              <ToiletPic className="w-full h-full object-cover" />
            </div>
            
            {/* 작은 이미지 2개 (세로 배치) */}
            <div className="flex flex-col gap-4">
              <div className="w-[188px] h-[137px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
                <ToiletPic className="w-full h-full object-cover" />
              </div>
              <div className="w-[188px] h-[137px] bg-gray-1 rounded-lg overflow-hidden flex items-center justify-center">
                <ToiletPic className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
        
        <button className="text-body1 self-end mt-2">
          사진 더보기 →
        </button>
      </div>
    );
  };

  if (!toilet) return null;

  return (
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
            {toilet.tags.map((tag, index) => (
              <div key={index} className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center">
                <span className="text-body2 text-gray-8">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <button 
        onClick={() => {
          console.log('toilet object:', toilet); // 디버깅
          console.log('toilet.id:', toilet.id); // ID 확인
          navigate(`/review-toilet/${toilet.id}`)}}
        className="w-full px-24 py-9 bg-main rounded-[10px] flex items-center justify-between gap-2 text-heading3-bold text-white"
      >
        <Pencil/>
        <span>리뷰 작성하기</span>
      </button>

      {/* Toilet Images */}
      {renderToiletImages()}
    </div>
  );
};

export default ReviewSidebar;