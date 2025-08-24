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
    handleSubmit,
    busy,
  } = useRegisterToilet();

  const { dropdownOpen, dropdownRef, toggleDropdown, closeAllDropdowns } =
    useDropdown();

  const onTimeChange = (timeType, value) => {
    const timeValue = {
      ...formData.operatingHours,
      [timeType]: value,
    };
    handleInputChange('operatingHours', timeValue);
    closeAllDropdowns();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[125px] py-8 lg:py-[65px]">
        <h1 className="text-heading1 text-gray-10 mb-8 lg:mb-16">
          화장실 등록
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 min-w-full lg:min-w-[1200px]">
          {/* 왼쪽 폼 */}
          <div className="w-full lg:w-[400px] flex flex-col gap-8 flex-shrink-0">
            {/* 화장실 이름 입력 */}
            <div className="flex flex-col items-start gap-2 p-10 self-stretch rounded-[10px] border border-gray-2 bg-white">
              <div className="text-body1 text-gray-10 mb-4">화장실 이름</div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="화장실 이름을 입력해주세요"
                className="w-full h-[54px] px-6 py-4 rounded-[10px] border border-gray-3 bg-white text-body2 placeholder-gray-4 outline-none focus:border-main transition-colors"
              />
            </div>

            {/* 주소 + 층수 */}
            <AddressForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            {/* 공중/개인 선택 */}
            <TypeSelector
              formData={formData}
              onInputChange={handleInputChange}
            />

            {/* 운영 시간 */}
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
          <div className="hidden lg:flex items-center">
            <div className="w-px h-full lg:h-[1180px] bg-gray-1"></div>
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

            <ImageUpload onImageUpload={handleImageUpload} />

            {/* 등록 버튼 */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                disabled={busy}
                className="flex items-center gap-2 px-8 lg:px-24 py-6 lg:py-9 bg-main hover:bg-main-2 rounded-[10px] transition-colors disabled:opacity-50"
              >
                <Pencil className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-heading3-bold text-white whitespace-nowrap">
                  {busy ? '등록 중...' : '화장실 정보 등록'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterToilet;
