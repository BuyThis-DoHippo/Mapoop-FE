import axiosInstance from '@/apis/instance';

// 단일 태그 조회
export const fetchBySingleTag = async (tag) => {
  const res = await axiosInstance.get('/api/toilets/by-top-tag', {
    params: { tag },
  });
  return res.data;
};

// 다중 태그 조회
export const fetchByMultiTags = async (tags) => {
  const res = await axiosInstance.get('/api/toilets/by-top-tag', {
    params: { tags },
  });
  return res.data;
};

// 검색 결과 조회
export const fetchSearchResults = async (params) => {
  const res = await axiosInstance.get('/api/search/results', { params });
  return res.data;
};

// 가까운 화장실 목록 조회
export const fetchNearbyToilets = async ({ lat, lng, limit = 16 }) => {
  const res = await axiosInstance.get('/api/search/home', {
    params: { lat, lng, limit },
  });
  return res.data;
};

// 자동완성
export const fetchAutoComplete = async ({ keyword, limit = 8 }) => {
  const res = await axiosInstance.get('/api/search/auto', {
    params: { keyword, limit },
  });
  return res.data;
};
