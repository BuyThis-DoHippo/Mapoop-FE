import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateToilet,
  useUploadToiletImages,
} from '@/hooks/register/useRegisterApi';

export const useRegisterToilet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    detailAddress: '', // floor
    type: 'public',
    is24Hours: false,
    description: '',
    specialNotes: '', // particulars
    images: [],
    operatingHours: {
      startHour: '09',
      startMinute: '00',
      endHour: '18',
      endMinute: '00',
    },
    facilities: [],
    specialFacilities: [],
  });

  const { mutateAsync: createToilet, isPending: creating } = useCreateToilet();
  const { mutateAsync: uploadImages, isPending: uploading } =
    useUploadToiletImages();

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayToggle = (key, value) => {
    setFormData((prev) => {
      const arr = new Set(prev[key] || []);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...prev, [key]: Array.from(arr) };
    });
  };

  const handleTimeChange = (timeType, value) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: { ...prev.operatingHours, [timeType]: value },
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: `${file.name}-${file.lastModified}`,
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleImageRemove = (imageId) => {
    setFormData((prev) => {
      const imageToRemove = prev.images.find((image) => image.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return {
        ...prev,
        images: prev.images.filter((image) => image.id !== imageId),
      };
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return '화장실 이름을 입력해주세요.';
    if (!formData.address.trim()) return '주소를 입력해주세요.';
    if (!formData.detailAddress.trim()) return '층수를 입력해주세요.';
    if (!formData.specialNotes.trim()) return '화장실 특이사항을 입력해주세요.';
    return null;
  };

  const handleSubmit = async () => {
    const msg = validate();
    if (msg) {
      alert(msg);
      return;
    }

    const openTime = `${formData.operatingHours.startHour}:${formData.operatingHours.startMinute}:00`;
    const closeTime = `${formData.operatingHours.endHour}:${formData.operatingHours.endMinute}:00`;

    const payload = {
      name: formData.name.trim(),
      type: formData.type === 'public' ? 'PUBLIC' : 'STORE',
      address: formData.address.trim(),
      floor: parseInt(formData.detailAddress, 10),
      isOpen24h: formData.is24Hours,
      openTime: formData.is24Hours ? null : openTime,
      closeTime: formData.is24Hours ? null : closeTime,
      tags: [...formData.facilities, ...formData.specialFacilities],
      description: formData.description.trim(),
      particulars: formData.specialNotes.trim(),
    };

    try {
      const res = await createToilet(payload);
      const newId = res?.data?.id ?? res?.id;

      if (newId && formData.images?.length > 0) {
        const fd = new FormData();
        // ✨ 수정된 부분: API 명세에 맞게 'images'를 'files'로 변경
        formData.images.forEach((image) => fd.append('files', image.file));
        await uploadImages({ toiletId: newId, imageData: fd });
      }

      alert('화장실이 성공적으로 등록되었습니다.');
      if (newId) {
        navigate(`/toilet-detail/${newId}`);
      } else {
        navigate('/');
      }
    } catch (e) {
      console.error(e);
      const errorMessage =
        e.response?.data?.message || '등록 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleArrayToggle,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleSubmit,
    busy: creating || uploading,
  };
};
