import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pencil from '@/assets/svg/toiletDetail/pencil.svg?react';
import { useRegisterToilet } from '@/hooks/useRegisterToilet';
import { useDropdown } from '@/hooks/useDropdown';
import AddressForm from '@/components/register/AddressForm';
import TypeSelector from '@/components/register/TypeSelector';
import OperatingHours from '@/components/register/OperatingHours';
import FacilityTags from '@/components/register/FacilityTags';
import DescriptionForm from '@/components/register/DescriptionForm';
import ImageUpload from '@/components/register/ImageUpload';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getToiletById, updateToilet } from '@/apis/mypage/toiletApi';
import { facilities, specialFacilities } from '@/constants/facilityData';

const EditToilet = () => {
  const { toiletId } = useParams();
  const queryClient = useQueryClient();

  const {
    formData,
    setFormData,
    handleInputChange,
    handleArrayToggle,
    handleImageUpload,
    handleImageRemove,
    busy,
  } = useRegisterToilet();

  const { dropdownOpen, dropdownRef, toggleDropdown, closeAllDropdowns } =
    useDropdown();

  // 상세 조회
  const { data } = useQuery({
    queryKey: ['toilet', toiletId],
    queryFn: () => getToiletById(toiletId),
    enabled: !!toiletId,
  });

  // 수정 mutation
  const mutation = useMutation({
    mutationFn: ({ id, toiletData }) => updateToilet({ id, toiletData }),
    onSuccess: () => {
      alert('화장실 정보가 수정되었습니다.');
      queryClient.invalidateQueries(['toilet', toiletId]);
      queryClient.invalidateQueries(['myToilets']);
    },
    onError: (err) => {
      console.error('❌ 수정 실패:', err);
      alert('수정 실패');
    },
  });

  // 상세조회 데이터 -> formData 세팅
  useEffect(() => {
    if (data?.data) {
      const toilet = data.data;

      const selectedFacilities = (toilet.tags || []).filter((tag) =>
        facilities.includes(tag)
      );
      const selectedSpecial = (toilet.tags || []).filter((tag) =>
        specialFacilities.includes(tag)
      );

      setFormData({
        name: toilet.name || '',
        type: toilet.type === 'PUBLIC' ? 'public' : 'private',
        address: toilet.location?.address || '',
        floor: toilet.location?.floor?.toString() || '', // 🔥 floor 반영
        operatingHours: {
          startHour: toilet.hours?.openTime?.split(':')[0] || '',
          startMinute: toilet.hours?.openTime?.split(':')[1] || '',
          endHour: toilet.hours?.closeTime?.split(':')[0] || '',
          endMinute: toilet.hours?.closeTime?.split(':')[1] || '',
        },
        isOpen24h: toilet.hours?.isOpen24h || false,
        facilities: selectedFacilities,
        specialFacilities: selectedSpecial,
        description: toilet.description || '',
        specialNotes: toilet.particulars || '',
        images: (toilet.images || []).map((url, idx) => ({ id: idx, url })),
      });
    }
  }, [data, setFormData]);

  const onTimeChange = (timeType, value) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [timeType]: value,
      },
    }));
    closeAllDropdowns();
  };

  const handleSave = () => {
    const payload = {
      name: formData.name,
      type: formData.type === 'public' ? 'PUBLIC' : 'PRIVATE',
      address: formData.address,
      floor: formData.floor ? Number(formData.floor) : null, // 🔥 floor 전송
      openTime: `${formData.operatingHours.startHour || '00'}:${
        formData.operatingHours.startMinute || '00'
      }:00`,
      closeTime: `${formData.operatingHours.endHour || '00'}:${
        formData.operatingHours.endMinute || '00'
      }:00`,
      isOpen24h: formData.isOpen24h,
      tags: [
        ...(formData.facilities || []),
        ...(formData.specialFacilities || []),
      ],
      description: formData.description,
      particulars: formData.specialNotes,
    };

    console.log('🚀 수정 요청 payload:', payload);

    mutation.mutate({ id: toiletId, toiletData: payload });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-[60px] py-8 lg:py-[40px]">
        <h1 className="text-heading1 text-gray-10 mb-8 lg:mb-12">
          화장실 정보 수정
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* 왼쪽 폼 */}
          <div className="w-full lg:w-[400px] flex flex-col gap-8 flex-shrink-0">
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

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                disabled={busy}
                className="flex items-center gap-2 px-8 lg:px-24 py-6 lg:py-9 bg-main hover:bg-main-2 rounded-[10px] transition-colors disabled:opacity-50"
              >
                <Pencil className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-heading3-bold text-white whitespace-nowrap">
                  {busy ? '수정 중...' : '화장실 정보 수정'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditToilet;
