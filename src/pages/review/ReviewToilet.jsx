import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';

// UI 컴포넌트
import ToiletInfoCard from '@/components/review/ToiletInfoCard';
import FacilitySelector from '@/components/review/FacilitySelector';
import StarRating from '@/components/review/StarRating';
import ReviewForm from '@/components/review/ReviewForm';

// API 훅
import { useUploadReviewImages, useCreateReview, useReviewTags, useDeleteReviewImage } from '@/hooks/review/useReviewApi';
import { useToiletDetail } from '@/hooks/toilet/useToiletApi';

const ReviewToilet = () => {
  const { id } = useParams();
  const toiletId = Number(id);
  const navigate = useNavigate();

  // 상태 관리
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedSpecialFacilities, setSelectedSpecialFacilities] = useState([]);
  
  const [uploadedImages, setUploadedImages] = useState([]);

  // 데이터 조회
  const { data: toiletData, isLoading: isToiletLoading } = useToiletDetail(toiletId);
  const { data: availableTags = [] } = useReviewTags();

  // API 요청 훅
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadReviewImages();
  const { mutateAsync: createReview, isPending: isCreating } = useCreateReview(toiletId);
  const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteReviewImage();

  const tagNameToIdMap = useMemo(() => {
    const map = new Map();
    availableTags.forEach(tag => map.set(tag.tagName, tag.tagId));
    return map;
  }, [availableTags]);

  // 이벤트 핸들러
  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev => prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]);
  };
  const handleConditionToggle = (condition) => {
    setSelectedCondition(prev => prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]);
  };
  const handleSpecialFacilityToggle = (facility) => {
    setSelectedSpecialFacilities(prev => prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]);
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    if (uploadedImages.length + files.length > 3) {
      return alert('이미지는 최대 3개까지 첨부할 수 있습니다.');
    }

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await uploadImages({ toiletId, formData });
      const newUrls = response.data.data; // ["url1", "url2"]
      // ✨ 3. URL 문자열을 { id, url } 객체 형태로 변환하여 상태에 저장합니다.
      const newImageObjects = newUrls.map(url => ({ id: url, url: url }));
      setUploadedImages(prev => [...prev, ...newImageObjects]);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  const handleImageRemove = async (urlToRemove) => {
    try {
      await deleteImage(urlToRemove);
      setUploadedImages(prev => prev.filter(image => image.url !== urlToRemove));
    } catch (error) {
      // 에러는 훅에서 처리
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) return alert('별점을 선택해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');

    const allSelectedTagNames = [
      ...selectedFacilities,
      ...selectedCondition,
      ...selectedSpecialFacilities,
    ];

    const payload = {
      rating,
      title: title.trim(),
      content: content.trim(),
      tagIds: allSelectedTagNames.map(name => tagNameToIdMap.get(name)).filter(Boolean),
      imageUrls: uploadedImages.map(image => image.url),
    };

    try {
      await createReview(payload);
      alert('리뷰가 성공적으로 등록되었습니다.');
      navigate(`/toilet-detail/${toiletId}`);
    } catch (error) {
      // 에러는 훅에서 처리
    }
  };
  
  const isBusy = isUploading || isCreating || isDeleting;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-[125px] py-[65px]">
        <h1 className="text-heading1 text-gray-10 mb-[73px]">리뷰 작성하기</h1>
        <div className="flex items-start">
          <div className="flex-1">
            <ToiletInfoCard
              name={isToiletLoading ? '로딩 중...' : toiletData?.name}
              address={isToiletLoading ? '...' : toiletData?.location?.address}
            />
            <div className="w-full h-px bg-gray-1 my-[40px]" />
            <FacilitySelector
              selectedFacilities={selectedFacilities}
              selectedCondition={selectedCondition}
              selectedSpecialFacilities={selectedSpecialFacilities}
              onFacilityToggle={handleFacilityToggle}
              onConditionToggle={handleConditionToggle}
              onSpecialFacilityToggle={handleSpecialFacilityToggle}
            />
          </div>
          <div className="mx-12 flex items-center">
            <div className="w-px h-[861px] bg-gray-1" />
          </div>
          <div className="w-[513px] flex flex-col">
            <div className="mb-10">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
            <ReviewForm
              title={title} onTitleChange={setTitle}
              content={content} onContentChange={setContent}
              uploadedImages={uploadedImages}
              onImageUpload={handleImageUpload}
              onImageRemove={(id) => handleImageRemove(id)}
            />
            <div className="mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isBusy}
                className="w-[385px] h-[101px] px-24 py-9 bg-main rounded-[10px] flex items-center justify-between gap-2 transition-colors disabled:opacity-60 hover:bg-main-2"
              >
                <Pencil className="w-6 h-6 text-white" />
                <span className="text-heading3-bold text-white">
                  {isBusy ? '처리 중…' : '리뷰 작성완료'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewToilet;