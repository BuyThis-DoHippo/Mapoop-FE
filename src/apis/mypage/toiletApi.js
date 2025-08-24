import axiosInstance from '@/apis/instance';

// 내가 등록한 화장실 목록 조회
export const getMyToilets = async () => {
  const res = await axiosInstance.get('/api/users/me/toilets');
  return res.data;
};

// 화장실 상세 조회
export const getToiletById = async (id) => {
  const res = await axiosInstance.get(`/api/toilets/${id}`);
  return res.data;
};

// 화장실 등록
export const createToilet = async (toiletData) => {
  const res = await axiosInstance.post('/api/toilets', toiletData);
  return res.data;
};

// 화장실 수정 (기존)
export const updateToilet = async ({ id, toiletData }) => {
  const res = await axiosInstance.put(`/api/toilets/${id}`, toiletData);
  return res.data;
};

// 이미지 업로드 (multipart/form-data, body에 toiletId 포함)
export const uploadToiletImages = async (toiletId, files) => {
  const formData = new FormData();
  formData.append('toiletId', toiletId);
  Array.from(files).forEach((file) => {
    formData.append('files', file);
  });

  const res = await axiosInstance.post('/api/toilets/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// 이미지 단건 삭제
export const deleteToiletImage = async (toiletId, imageId) => {
  const res = await axiosInstance.delete(
    `/api/toilets/${toiletId}/images/${imageId}`
  );
  return res.data;
};

// 이미지 전체 삭제
export const deleteAllToiletImages = async (toiletId) => {
  const res = await axiosInstance.delete(`/api/toilets/${toiletId}/images`);
  return res.data;
};

// 화장실 수정
export const updateToiletWithImages = async ({ id, toiletData, imageIds }) => {
  const res = await axiosInstance.put(`/api/toilets/${id}`, {
    ...toiletData,
    imageIds, // 서버에서 남길 이미지 ID 배열
  });
  return res.data;
};
