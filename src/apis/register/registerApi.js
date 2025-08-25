import axiosInstance from '@/apis/instance';

/**
 * 화장실 등록
 * @param {Object} toiletData - 화장실 정보
 */
export const createToilet = async (toiletData) => {
  const response = await axiosInstance.post('/api/toilets', toiletData);
  return response.data;
};

/**
 * 화장실 이미지 업로드
 * @param {FormData} imageData - 'files'를 키로 하는 이미지 파일 데이터
 */
export const uploadToiletImages = async (imageData) => {
  const response = await axiosInstance.post(
    `/api/toilets/images/upload`,
    imageData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

/**
 * 화장실 이미지 단건 삭제
 * @param {number} imageId - 이미지 ID
 */
export const deleteToiletImage = async (imageId) => {
  const response = await axiosInstance.delete(`/api/toilets/images/${imageId}`);
  return response.data;
};
