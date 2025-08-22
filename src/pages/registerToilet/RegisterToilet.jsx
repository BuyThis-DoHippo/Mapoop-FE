import { useState, useEffect, useRef } from 'react';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';
import Picture from '@/assets/svg/review/picture.svg?react';
import ArrowUp from '@/assets/svg/register/arrow-up.svg?react';
import ArrowDown from '@/assets/svg/register/arrow-down.svg?react';

const RegisterToilet = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    detailAddress: '',
    type: 'private', // 'public' or 'private'
    facilities: [],
    condition: [],
    specialFacilities: [],
    operatingHours: {
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: ''
    },
    description: '',
    specialNotes: '',
    images: []
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    startHour: false,
    startMinute: false,
    endHour: false,
    endMinute: false
  });

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen({
          startHour: false,
          startMinute: false,
          endHour: false,
          endMinute: false
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const facilities = [
    "현재이용가능", "남녀 분리", "가게 안 화장실", "24시간", "비데 있음", "위생용품 제공"
  ];

  const conditions = ["깨끗함", "칸많음"];
  const specialFacilities = ["장애인화장실", "기저귀교환대"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleTimeChange = (timeType, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [timeType]: value
      }
    }));
    setDropdownOpen({
      startHour: false,
      startMinute: false,
      endHour: false,
      endMinute: false
    });
  };

  const toggleDropdown = (timeType) => {
    setDropdownOpen(prev => {
      // 모든 드롭다운을 닫고, 클릭한 것만 토글
      const newState = {
        startHour: false,
        startMinute: false,
        endHour: false,
        endMinute: false
      };
      newState[timeType] = !prev[timeType];
      return newState;
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (formData.images.length + files.length > 3) {
      alert('이미지는 최대 3개까지 첨부 가능합니다.');
      return;
    }
    
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleImageRemove = (imageId) => {
    setFormData(prev => {
      const imageToRemove = prev.images.find(img => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return {
        ...prev,
        images: prev.images.filter(img => img.id !== imageId)
      };
    });
  };

  const handleSubmit = () => {
    console.log('화장실 등록 데이터:', formData);
    alert('화장실 정보가 등록되었습니다!');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[125px] py-8 lg:py-[65px]">
        <div className="text-heading1 text-gray-10 mb-8 lg:mb-16">화장실 등록</div>

        <div className="flex gap-12 min-w-[1200px]">
          {/* 왼쪽 폼 */}
          <div className="w-[400px] flex flex-col gap-8 flex-shrink-0">
            
            {/* 주소 등록 */}
            <div className="flex flex-col items-start gap-8 p-10 self-stretch rounded-[10px] border border-gray-2 bg-white">
              
              <div className="flex flex-col gap-4 w-full">
                <div className="text-body1 text-gray-10">주소 등록</div>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full h-[54px] px-6 py-4 rounded-[10px] border border-gray-3 bg-white text-body2 placeholder-gray-4 outline-none focus:border-main transition-colors"
                />
                <div className="flex justify-end">
                  <button className="w-[108px] h-10 flex justify-center items-center gap-2 px-[20px] py-2 rounded-[10px] border border-main-2 bg-main-3 text-main-2 text-body2 hover:bg-opacity-80 transition-colors">
                    주소 찾기
                  </button>
                </div>
              </div>

              <div className="w-full">
                <div className="text-body1 text-gray-8 mb-4">세부주소</div>
                <input
                  type="text"
                  value={formData.detailAddress}
                  onChange={(e) => handleInputChange('detailAddress', e.target.value)}
                  placeholder="층수, 호수를 입력해주세요"
                  className="w-full h-[54px] px-6 py-4 rounded-[10px] border border-gray-3 bg-white text-body2 placeholder-gray-4 outline-none focus:border-main transition-colors"
                />
              </div>
            </div>

            {/* 공공/민간 선택 */}
            <div className="w-full flex items-center gap-2 p-10 rounded-[10px] border border-gray-2 bg-white">
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    checked={formData.type === 'public'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-5 h-5 text-main"
                  />
                  <span className="text-body1 text-gray-10">공공</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="private"
                    checked={formData.type === 'private'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-5 h-5 text-main"
                  />
                  <span className="text-body1 text-gray-10">민간</span>
                </label>
              </div>
            </div>

            {/* 영업시간 */}
            <div className="flex items-center gap-2 px-14 py-9 self-stretch rounded-[10px] border border-gray-2 bg-white" ref={dropdownRef}>
              <div className="w-full">
                <div className="text-heading3-bold text-gray-10 mb-6">영업시간</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div 
                      className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer relative ${
                        dropdownOpen.startHour || formData.operatingHours.startHour 
                          ? 'border border-gray-6' 
                          : 'border border-gray-3'
                      }`}
                      onClick={() => toggleDropdown('startHour')}
                    >
                      <span className={formData.operatingHours.startHour ? 'text-gray-10' : 'text-gray-4'}>
                        {formData.operatingHours.startHour ? `${formData.operatingHours.startHour}시` : '시작 시'}
                      </span>
                      {dropdownOpen.startHour ? <ArrowDown className="h-[6px] w-[12px]" /> : <ArrowUp className="h-[6px] w-[12px]" />}
                    </div>
                    {dropdownOpen.startHour && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                        {Array.from({length: 24}, (_, i) => (
                          <div
                            key={i}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                              i === 0 ? 'bg-gray-0' : ''
                            }`}
                            onClick={() => handleTimeChange('startHour', i.toString().padStart(2, '0'))}
                          >
                            {`${i.toString().padStart(2, '0')}시`}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div 
                      className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer ${
                        dropdownOpen.startMinute || formData.operatingHours.startMinute
                          ? 'border border-gray-6' 
                          : 'border border-gray-3'
                      }`}
                      onClick={() => toggleDropdown('startMinute')}
                    >
                      <span className={formData.operatingHours.startMinute ? 'text-gray-10' : 'text-gray-4'}>
                        {formData.operatingHours.startMinute ? `${formData.operatingHours.startMinute}분` : '시작 분'}
                      </span>
                      {dropdownOpen.startMinute ? <ArrowDown /> : <ArrowUp />}
                    </div>
                    {dropdownOpen.startMinute && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                        {['00', '01', '02', '03', '04'].map((minute, i) => (
                          <div
                            key={minute}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                              i === 0 ? 'bg-gray-0' : ''
                            }`}
                            onClick={() => handleTimeChange('startMinute', minute)}
                          >
                            {`${minute}분`}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div 
                      className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer ${
                        dropdownOpen.endHour || formData.operatingHours.endHour
                          ? 'border border-gray-6' 
                          : 'border border-gray-3'
                      }`}
                      onClick={() => toggleDropdown('endHour')}
                    >
                      <span className={formData.operatingHours.endHour ? 'text-gray-10' : 'text-gray-4'}>
                        {formData.operatingHours.endHour ? `${formData.operatingHours.endHour}시` : '마감 시'}
                      </span>
                      {dropdownOpen.endHour ? <ArrowDown /> : <ArrowUp />}
                    </div>
                    {dropdownOpen.endHour && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                        {Array.from({length: 24}, (_, i) => (
                          <div
                            key={i}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                              i === 0 ? 'bg-gray-0' : ''
                            }`}
                            onClick={() => handleTimeChange('endHour', i.toString().padStart(2, '0'))}
                          >
                            {`${i.toString().padStart(2, '0')}시`}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div 
                      className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer ${
                        dropdownOpen.endMinute || formData.operatingHours.endMinute
                          ? 'border border-gray-6' 
                          : 'border border-gray-3'
                      }`}
                      onClick={() => toggleDropdown('endMinute')}
                    >
                      <span className={formData.operatingHours.endMinute ? 'text-gray-10' : 'text-gray-4'}>
                        {formData.operatingHours.endMinute ? `${formData.operatingHours.endMinute}분` : '마감 분'}
                      </span>
                      {dropdownOpen.endMinute ? <ArrowDown /> : <ArrowUp />}
                    </div>
                    {dropdownOpen.endMinute && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                        {['00', '01', '02', '03', '04'].map((minute, i) => (
                          <div
                            key={minute}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                              i === 0 ? 'bg-gray-0' : ''
                            }`}
                            onClick={() => handleTimeChange('endMinute', minute)}
                          >
                            {`${minute}분`}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 세로 분할선 */}
          <div className="flex items-center">
            <div className="w-px h-[1280px] bg-gray-1"></div>
          </div>

          {/* 오른쪽 콘텐츠 */}
          <div className="flex-1 flex flex-col gap-8">
            {/* 화장실 시설 태그 */}
            <div>
              <div className="text-heading3-bold text-gray-10 mb-9">화장실 시설 태그</div>
              
              <div className="space-y-8">
                {/* 기본 시설 */}
                <div>
                  <div className="text-body1-bold text-gray-8 mb-4">기본 시설</div>
                  <div className="flex flex-wrap gap-3">
                    {facilities.map(facility => (
                      <button
                        key={facility}
                        onClick={() => handleArrayToggle('facilities', facility)}
                        className={`px-4 lg:px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${
                          formData.facilities.includes(facility)
                            ? 'bg-main text-white border-main'
                            : 'bg-white text-gray-5 border-gray-5'
                        }`}
                      >
                        <span className="text-body2">{facility}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 특수 시설 */}
                <div>
                  <div className="text-body1-bold text-gray-8 mb-4">특수 시설</div>
                  <div className="flex flex-wrap gap-3">
                    {specialFacilities.map(facility => (
                      <button
                        key={facility}
                        onClick={() => handleArrayToggle('specialFacilities', facility)}
                        className={`px-4 lg:px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${
                          formData.specialFacilities.includes(facility)
                            ? 'bg-main text-white border-main'
                            : 'bg-white text-gray-5 border-gray-5'
                        }`}
                      >
                        <span className="text-body2">{facility}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 장소 설명 입력 */}
            <div className={`bg-gray-0 rounded-[10px] relative ${
              formData.images.length > 0 ? 'h-[556px]' : 'h-[270px]'
            }`}>
              {/* Textarea */}
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="장소 설명을 작성해주세요"
                className={`w-full bg-transparent border-none outline-none px-4 lg:px-[61px] resize-none text-heading3-regular text-gray-10 placeholder-gray-2 ${
                  formData.images.length > 0 ? 'pt-[33px] pb-4 flex-shrink-0 h-[260px]' : 'h-full pt-[33px] pb-[33px]'
                }`}
              />
              
              {/* 업로드된 이미지들 */}
              {formData.images.length > 0 && (
                <div className="flex-1 pl-5 pr-4 absolute bottom-[33px] flex flex-wrap gap-4 overflow-auto">
                  {formData.images.map(image => (
                    <div key={image.id} className="relative">
                      <div className="w-[208px] h-[245px] rounded-[10px] overflow-hidden">
                        <img 
                          src={image.url} 
                          alt="uploaded" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* X 버튼 */}
                      <button
                        onClick={() => handleImageRemove(image.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-sm hover:bg-opacity-70 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 특수사항 입력 */}
            <div className="bg-gray-0 rounded-[10px]">
              <textarea
                value={formData.specialNotes}
                onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                placeholder="화장실 특수사항을 작성해주세요(비밀번호, 기타사항)"
                className="w-full h-[96px] bg-transparent border-none outline-none px-4 lg:px-[61px] py-[33px] resize-none text-heading3-regular text-gray-10 placeholder-gray-2"
              />
            </div>

            {/* 이미지 업로드 */}
            <div className="h-[270px] bg-gray-0 rounded-[10px] cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="toilet-image-upload"
              />
              <label htmlFor="toilet-image-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <Picture/>
                  <span className="text-body1 text-gray-2">사진 추가하기</span>
                </div>
              </label>
            </div>

            {/* 등록 버튼 */}
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 lg:px-24 py-6 lg:py-9 bg-main hover:bg-main-2 rounded-[10px] transition-colors"
              >
                <Pencil className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-heading3-bold text-white whitespace-nowrap">화장실 정보 등록</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterToilet;