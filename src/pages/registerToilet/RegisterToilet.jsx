import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';
import { useRegisterToilet } from '@/hooks/useRegisterToilet';
import { useDropdown } from '@/hooks/useDropdown';
import AddressForm from '@/components/register/AddressForm';
import TypeSelector from '@/components/register/TypeSelector';
import OperatingHours from '@/components/register/OperatingHours';
import FacilityTags from '@/components/register/FacilityTags';
import DescriptionForm from '@/components/register/DescriptionForm';
import ImageUpload from '@/components/register/ImageUpload';

const RegisterToilet = () => {
  const {
    formData,
    handleInputChange,
    handleArrayToggle,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleSubmit
  } = useRegisterToilet();

  const {
    dropdownOpen,
    dropdownRef,
    toggleDropdown,
    closeAllDropdowns
  } = useDropdown();

  const onTimeChange = (timeType, value) => {
    handleTimeChange(timeType, value);
    closeAllDropdowns();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[125px] py-8 lg:py-[65px]">
        <div className="text-heading1 text-gray-10 mb-8 lg:mb-16">화장실 등록</div>

        <div className="flex gap-12 min-w-[1200px]">
          {/* 왼쪽 폼 */}
          <div className="w-[400px] flex flex-col gap-8 flex-shrink-0">
            <AddressForm 
              formData={formData}
              onInputChange={handleInputChange}
            />
            
            <TypeSelector 
              formData={formData}
              onInputChange={handleInputChange}
            />

            <OperatingHours
              formData={formData}
              onTimeChange={onTimeChange}
              dropdownOpen={dropdownOpen}
              dropdownRef={dropdownRef}
              onToggleDropdown={toggleDropdown}
              onCloseDropdowns={closeAllDropdowns}
            />
          </div>

          {/* 세로 분할선 */}
          <div className="flex items-center">
            <div className="w-px h-[1280px] bg-gray-1"></div>
          </div>

          {/* 오른쪽 콘텐츠 */}
          <div className="flex-1 flex flex-col gap-8">
            <FacilityTags 
              formData={formData}
              onArrayToggle={handleArrayToggle}
            />

            <DescriptionForm 
              formData={formData}
              onInputChange={handleInputChange}
              onImageRemove={handleImageRemove}
            />

            <ImageUpload 
              onImageUpload={handleImageUpload}
            />

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