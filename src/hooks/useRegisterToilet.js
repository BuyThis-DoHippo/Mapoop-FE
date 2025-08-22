import { useState } from 'react';

export const useRegisterToilet = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    detailAddress: '',
    type: 'private',
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

  return {
    formData,
    handleInputChange,
    handleArrayToggle,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleSubmit
  };
};