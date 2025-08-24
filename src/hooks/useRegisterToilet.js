import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateToilet, useUploadToiletImages, useDeleteToiletImage } from '@/hooks/register/useRegisterApi';

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
    images: [], // { image_id, url } 형태의 객체를 저장합니다.
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
  const { mutateAsync: uploadImages, isPending: uploading } = useUploadToiletImages();
  const { mutateAsync: deleteImage, isPending: deleting } = useDeleteToiletImage();

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

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const fd = new FormData();
    files.forEach(file => fd.append('files', file));

    try {
      const res = await uploadImages(fd);
      // API 응답의 `imageId`를 `image_id`로 변환하여 상태에 저장
      const newImages = res.data.images.map(img => ({
        image_id: img.imageId, // `imageId` from response becomes `image_id` in state
        url: img.url
      }));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleImageRemove = async (image_id) => {
    try {
      await deleteImage(image_id);
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(image => image.image_id !== image_id)
      }));
    } catch (e) {
      console.error(e);
    }
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
      imageUrls: formData.images.map(img => img.url),
    };

    try {
      const res = await createToilet(payload);
      const newId = res?.data?.id ?? res?.id;

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
    busy: creating || uploading || deleting,
  };
};