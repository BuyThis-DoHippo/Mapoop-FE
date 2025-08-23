import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateToilet, useUploadToiletImages } from '@/hooks/toilet/useToiletApi';

/**
 * 폼 상태 + 제출 훅
 * - 먼저 /api/toilets 로 본문 등록
 * - 업로드된 이미지는 /api/toilets/{id}/images 로 후속 전송
 * - 성공 시 상세 페이지로 이동
 */
export const useRegisterToilet = () => {
  const navigate = useNavigate();

  // 폼 상태 (필드 키는 실제 컴포넌트와 매칭)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    detailAddress: '',
    lat: '',
    lng: '',
    type: 'PUBLIC', // 'PUBLIC' | 'PRIVATE'
    openTime: '',   // '09:00'
    closeTime: '',  // '18:00'
    is24Hours: false,
    tags: [],       // 문자열 배열
    description: '',
    // 이미지 임시 보관
    images: [],     // File 배열
  });

  const { mutateAsync: createToilet, isPending: creating } = useCreateToilet();
  const { mutateAsync: uploadImages, isPending: uploading } = useUploadToiletImages();

  // 입력 핸들러
  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // 태그 토글
  const handleArrayToggle = (key, value) => {
    setFormData(prev => {
      const arr = new Set(prev[key] || []);
      if (arr.has(value)) arr.delete(value); else arr.add(value);
      return { ...prev, [key]: Array.from(arr) };
    });
  };

  // 시간 변경
  const handleTimeChange = (timeKey, value) => {
    setFormData(prev => ({ ...prev, [timeKey]: value }));
  };

  // 이미지 업로드(로컬 상태 보관)
  const handleImageUpload = (files) => {
    const list = Array.from(files || []);
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...list] }));
  };

  // 이미지 제거(로컬 상태)
  const handleImageRemove = (index) => {
    setFormData(prev => {
      const next = [...(prev.images || [])];
      next.splice(index, 1);
      return { ...prev, images: next };
    });
  };

  // 유효성 검증(최소)
  const validate = () => {
    if (!formData.name.trim()) return '이름을 입력해주세요.';
    if (!formData.address.trim()) return '주소를 입력해주세요.';
    if (!formData.lat || !formData.lng) return '지도에서 위치를 지정해주세요.';
    return null;
  };

  // 제출
  const handleSubmit = async () => {
    const msg = validate();
    if (msg) {
      alert(msg);
      return;
    }

    // 백엔드에 보낼 payload 형태(필드명은 API 명세에 맞게 조정)
    const payload = {
      name: formData.name,
      type: formData.type, // 'PUBLIC' | 'PRIVATE'
      location: { lat: Number(formData.lat), lng: Number(formData.lng), address: formData.address, detailAddress: formData.detailAddress },
      hours: formData.is24Hours
        ? { is24Hours: true }
        : { is24Hours: false, openTime: formData.openTime, closeTime: formData.closeTime },
      tags: formData.tags,
      description: formData.description,
    };

    try {
      // 1) 본문 등록
      const res = await createToilet(payload);
      const newId = res?.data?.id ?? res?.id; // 응답 래핑 유연 처리

      // 2) 이미지 업로드(선택)
      if (newId && formData.images?.length) {
        const fd = new FormData();
        formData.images.forEach((file) => fd.append('images', file));
        await uploadImages({ toiletId: newId, imageData: fd });
      }

      alert('등록이 완료되었습니다.');
      if (newId) navigate(`/toilet-detail/${newId}`);
      else navigate(-1);
    } catch (e) {
      console.error(e);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return {
    formData,
    handleInputChange,
    handleArrayToggle,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleSubmit,
    busy: creating || uploading,
  };
};
