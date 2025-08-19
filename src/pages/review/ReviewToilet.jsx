import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockToiletData } from '@/mocks/toiletData';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';

// Components
import ToiletInfoCard from '@/components/review/ToiletInfoCard';
import FacilitySelector from '@/components/review/FacilitySelector';
import StarRating from '@/components/review/StarRating';
import ReviewForm from '@/components/review/ReviewForm';

const ReviewToilet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toilet, setToilet] = useState(null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedSpecialFacilities, setSelectedSpecialFacilities] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    // 실제로는 id를 사용해서 해당 화장실 데이터를 가져와야 하지만, 
    // 현재는 mockData를 사용
    setToilet(mockToiletData);
  }, [id]);

  // 화장실 정보 (mockData에서 가져옴)
  const toiletInfo = toilet ? {
    name: toilet.name,
    address: toilet.location.address
  } : {
    name: "화장실 정보를 불러오는 중...",
    address: ""
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleConditionToggle = (condition) => {
    setSelectedCondition(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const handleSpecialFacilityToggle = (facility) => {
    setSelectedSpecialFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // 실제로는 파일 업로드 로직이 들어갈 것
    setUploadedImages(prev => [...prev, ...files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }))]);
  };

  const handleSubmit = () => {
    if (!rating) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    console.log({
      rating,
      title,
      content,
      facilities: selectedFacilities,
      condition: selectedCondition,
      specialFacilities: selectedSpecialFacilities,
      images: uploadedImages
    });

    alert('리뷰가 작성되었습니다!');
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-[125px] py-[65px]">
        {/* Page Title */}
        <h1 className="text-heading1 text-gray-10 mb-[73px]">리뷰 작성하기</h1>

        <div className="flex items-start">
          {/* Left Sidebar */}
          <div className="w-[400px] flex flex-col gap-32">
            {/* Toilet Info Card */}
            <ToiletInfoCard 
              name={toiletInfo.name}
              address={toiletInfo.address}
            />

            {/* Facilities Section */}
            <FacilitySelector 
              selectedFacilities={selectedFacilities}
              selectedCondition={selectedCondition}
              selectedSpecialFacilities={selectedSpecialFacilities}
              onFacilityToggle={handleFacilityToggle}
              onConditionToggle={handleConditionToggle}
              onSpecialFacilityToggle={handleSpecialFacilityToggle}
            />
          </div>

          {/* Vertical Divider */}
          <div className="mx-12 flex items-center">
            <div className="w-px h-[861px] bg-gray-1"></div>
          </div>

          {/* Right Content */}
          <div className="flex-1 max-w-[720px] flex flex-col gap-16">
            <div className="flex flex-col gap-[72px]">
              {/* Rating Section */}
              <StarRating 
                rating={rating}
                onRatingChange={setRating}
              />

              {/* Form Section */}
              <ReviewForm 
                title={title}
                content={content}
                uploadedImages={uploadedImages}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onImageUpload={handleImageUpload}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                className="w-[385px] h-[101px] px-24 py-9 bg-main hover:bg-main-2 rounded-[10px] flex items-center justify-between gap-2 transition-colors"
              >
                <Pencil className="w-6 h-6 text-white" />
                <span className="text-heading3-bold text-white">리뷰 작성완료</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewToilet;