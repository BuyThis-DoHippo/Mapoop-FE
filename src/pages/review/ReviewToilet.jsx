/**
 * src/pages/review/ReviewToilet.jsx
 * 리뷰 작성 페이지 컴포넌트입니다.
 * 상태 관리 로직을 수정하여 FacilitySelector와 올바르게 연동되도록 수정했습니다.
 */
import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';

// UI 컴포넌트 Import
import ToiletInfoCard from '@/components/review/ToiletInfoCard';
import FacilitySelector from '@/components/review/FacilitySelector';
import StarRating from '@/components/review/StarRating';
import ReviewForm from '@/components/review/ReviewForm';

// 데이터 로딩 및 API 요청을 위한 훅 Import
import { useToiletDetail } from '@/hooks/toilet/useToiletApi';
import { useUploadReviewImages, useCreateReview, useReviewTags } from '@/hooks/review/useReviewApi';

const ReviewToilet = () => {
  const { id } = useParams();
  const toiletId = Number(id);
  const navigate = useNavigate();

  // 1. 상태 관리 (오류 수정을 위해 태그 그룹별로 상태 분리)
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedSpecialFacilities, setSelectedSpecialFacilities] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // 2. 데이터 조회 (React Query)
  const { data: toiletData, isLoading: isToiletLoading } = useToiletDetail(toiletId);
  const { data: availableTags = [] } = useReviewTags();

  // 3. API 요청 훅 (React Query Mutations)
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadReviewImages();
  const { mutateAsync: createReview, isPending: isCreating } = useCreateReview(toiletId);

  // 태그 이름을 ID로 변환하기 위한 Map (효율적인 탐색)
  const tagNameToIdMap = useMemo(() => {
    const map = new Map();
    availableTags.forEach(tag => map.set(tag.tagName, tag.tagId));
    return map;
  }, [availableTags]);

  // 4. 이벤트 핸들러 (각 태그 그룹별 핸들러 분리)
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
    if (uploadedImageUrls.length + files.length > 3) {
      return alert('이미지는 최대 3개까지 첨부할 수 있습니다.');
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await uploadImages({ toiletId, formData });
      const newUrls = response.data.data.images.map(img => img.url);
      setUploadedImageUrls(prev => [...prev, ...newUrls]);
    } catch (error) {
      // 에러 처리는 useUploadReviewImages 훅 내부에서 alert로 이미 처리됨
    }
  };

  const handleImageRemove = (urlToRemove) => {
    setUploadedImageUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  const handleSubmit = async () => {
    if (rating === 0) return alert('별점을 선택해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');

    // 모든 선택된 태그를 하나의 배열로 합침
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
      imageUrls: uploadedImageUrls,
    };

    try {
      await createReview(payload);
      alert('리뷰가 성공적으로 등록되었습니다.');
      navigate(`/toilet-detail/${toiletId}`);
    } catch (error) {
       // 에러 처리는 useCreateReview 훅 내부에서 alert로 이미 처리됨
    }
  };

  const isBusy = isUploading || isCreating;

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
            {/* FacilitySelector에 분리된 상태와 핸들러를 각각 전달 */}
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
              uploadedImages={uploadedImageUrls.map(url => ({ id: url, url }))}
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
                  {isBusy ? '등록 중…' : '리뷰 작성완료'}
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