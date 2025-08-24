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
 * @param {object} params
 * @param {number} params.toiletId - 화장실 ID
 * @param {FormData} params.imageData - 이미지 파일 데이터
 */
export const uploadToiletImages = async ({ toiletId, imageData }) => {
  const response = await axiosInstance.post(`/api/toilets/${toiletId}/images`, imageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};