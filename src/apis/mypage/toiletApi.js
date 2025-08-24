import axiosInstance from '@/apis/instance';

// 내가 등록한 화장실 목록 조회
export const getMyToilets = async () => {
  const response = await axiosInstance.get('/api/users/me/toilets');
  return response.data;
};

// 화장실 상세 조회
export const getToiletById = async (id) => {
  const response = await axiosInstance.get(`/api/toilets/${id}`);
  return response.data;
};

// 화장실 등록
export const createToilet = async (toiletData) => {
  const response = await axiosInstance.post('/api/toilets', toiletData);
  return response.data;
};

// 화장실 수정 (기본 정보)
export const updateToilet = async ({ id, toiletData }) => {
  const response = await axiosInstance.put(`/api/toilets/${id}`, toiletData);
  return response.data;
};

// 화장실 이미지 업로드
export const uploadToiletImages = async (imageData) => {
  const response = await axiosInstance.post(
    `/api/toilets/images/upload`,
    imageData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

// 화장실 이미지 단건 삭제
export const deleteToiletImage = async ({ toiletId, imageId }) => {
  const response = await axiosInstance.delete(
    `/api/toilets/${toiletId}/images/${imageId}`
  );
  return response.data;
};

// 화장실 이미지 전체 삭제
export const deleteAllToiletImages = async ({ toiletId }) => {
  const response = await axiosInstance.delete(
    `/api/toilets/${toiletId}/images`
  );
  return response.data;
};
