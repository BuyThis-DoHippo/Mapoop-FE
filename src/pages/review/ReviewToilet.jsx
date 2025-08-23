import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';

// 기존 UI 컴포넌트
import ToiletInfoCard from '@/components/review/ToiletInfoCard';
import FacilitySelector from '@/components/review/FacilitySelector';
import StarRating from '@/components/review/StarRating';
import ReviewForm from '@/components/review/ReviewForm';

// 훅
import { useToiletDetail } from '@/hooks/toilet/useToiletApi';
import {
  useUploadReviewImages,
  useCreateReview,
  useReviewTags,
} from '@/hooks/review/useReviewApi';

const ReviewToilet = () => {
  const { id } = useParams(); // /toilets/:id/review
  const toiletId = Number(id);
  const navigate = useNavigate();

  // -----------------------------
  // 상태 (기존 이름 유지)
  // -----------------------------
  const [toilet, setToilet] = useState(null);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedSpecialFacilities, setSelectedSpecialFacilities] = useState([]);

  const [uploadedImages, setUploadedImages] = useState([]);

  // -----------------------------
  // 데이터 로딩
  // -----------------------------
  const { data: toiletRes } = useToiletDetail(toiletId);
  useEffect(() => {
    const apiData = toiletRes?.data ?? toiletRes;
    if (apiData) setToilet(apiData);
  }, [toiletRes]);

  // 태그 API + 폴백 처리
  const { data: tagsData, isError: tagsError } = useReviewTags();
  const apiTags = tagsData?.all ?? [];
  const fallbackTags = useMemo(() => {
    const arr = Array.isArray(toilet?.tags) ? toilet.tags : [];
    return arr.map((name, i) => ({
      tagId: undefined,
      tagName: name,
      _fallbackKey: `${name}-${i}`,
    }));
  }, [toilet?.tags]);

  const allTags = apiTags.length > 0 && !tagsError ? apiTags : fallbackTags;

  const nameToId = useMemo(() => {
    const m = new Map();
    allTags.forEach((t) => {
      if (t.tagName) m.set(t.tagName, t.tagId);
    });
    return m;
  }, [allTags]);

  // -----------------------------
  // 토글 핸들러
  // -----------------------------
  const handleFacilityToggle = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };
  const handleConditionToggle = (condition) => {
    setSelectedCondition((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    );
  };
  const handleSpecialFacilityToggle = (facility) => {
    setSelectedSpecialFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  // -----------------------------
  // 이미지 업로드
  // -----------------------------
  const { mutateAsync: uploadImages, isPending: uploading } = useUploadReviewImages();

  const handleImageUpload = async (event) => {
    const files = Array.from(event?.target?.files || []);
    if (!files.length) return;

    const fd = new FormData();
    files.forEach((f) => fd.append('images', f));
    const urls = await uploadImages(fd);

    setUploadedImages((prev) => [
      ...prev,
      ...urls.map((url) => ({ id: Date.now() + Math.random(), file: null, url })),
    ]);
  };

  const handleImageRemove = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // -----------------------------
  // 제출
  // -----------------------------
  const { mutateAsync: createReview, isPending: creating } = useCreateReview(toiletId);

  const handleSubmit = async () => {
    if (!rating) return alert('별점을 선택해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');

    const tagNames = [
      ...selectedFacilities,
      ...selectedCondition,
      ...selectedSpecialFacilities,
    ];
    const tagIds = tagNames
      .map((name) => nameToId.get(name))
      .filter((v) => Number.isFinite(v));

    const payload = {
      rating: Number(rating),
      title: title.trim(),
      content: content.trim(),
      tagIds,
      imageUrls: uploadedImages.map((i) => i.url),
      ...(tagIds.length === 0 ? { tagNames } : {}),
    };

    try {
      await createReview(payload);
      alert('리뷰가 작성되었습니다!');
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  // -----------------------------
  // 카드 상단 정보
  // -----------------------------
  const toiletInfo = toilet
    ? {
        name: toilet.name,
        address: toilet.location?.address,
        images: toilet.images ?? [],
        ratingAvg: toilet.rating?.avgRating ?? 0,
        totalReviews: toilet.rating?.totalReviews ?? 0,
        type: toilet.type,
        hours: toilet.hours,
      }
    : {
        name: '화장실 정보를 불러오는 중...',
        address: '',
        images: [],
        ratingAvg: 0,
        totalReviews: 0,
        type: '',
        hours: null,
      };

  // -----------------------------
  // 렌더
  // -----------------------------
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-[125px] py-[65px]">
        <h1 className="text-heading1 text-gray-10 mb-[73px]">리뷰 작성하기</h1>

        <div className="flex items-start">
          {/* Left Content */}
          <div className="flex-1">
            <ToiletInfoCard
              name={toiletInfo.name}
              address={toiletInfo.address}
              images={toiletInfo.images}
              ratingAvg={toiletInfo.ratingAvg}
              totalReviews={toiletInfo.totalReviews}
              type={toiletInfo.type}
              hours={toiletInfo.hours}
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

          {/* Right Content */}
          <div className="w-[513px] flex flex-col">
            <div className="mb-10">
              <StarRating
                value={rating}
                rating={rating}
                onChange={setRating}
                onRatingChange={setRating}
                activeColor="#00AEEF"
              />
            </div>

            <ReviewForm
              title={title}
              content={content}
              uploadedImages={uploadedImages}
              onTitleChange={setTitle}
              onContentChange={setContent}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              uploading={uploading}
            />

            <div className="mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={creating || uploading}
                className="w-[385px] h-[101px] px-24 py-9 bg-main rounded-[10px] flex items-center justify-between gap-2 transition-colors disabled:opacity-60 hover:opacity-95"
                aria-label="리뷰 작성완료"
              >
                <Pencil className="w-6 h-6 text-white" />
                <span className="text-heading3-bold text-white">
                  {creating || uploading ? '등록 중…' : '리뷰 작성완료'}
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
