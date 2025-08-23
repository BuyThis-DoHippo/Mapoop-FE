import axios from 'axios';
import qs from 'qs';

// 토큰 가져오는 함수
const getAccessToken = () => {
  const nameEQ = 'access_token=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }), // 배열을 repeat 방식으로 직렬화
});

// 요청 인터셉터 (디버깅 로그 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('axios 요청:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      params: config.params,
      data: config.data,
    });

    // 인증이 필요한 요청에 토큰 추가
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('토큰 추가됨:', `Bearer ${token.substring(0, 10)}...`);
    }
    return config;
  },
  (error) => {
    console.error('axios 요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('axios 응답 성공:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error('axios 응답 에러:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    const originalRequest = error.config;

    // 401 에러 처리 (토큰 만료 등)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰 가져오기
        const refreshToken = (() => {
          const nameEQ = 'refresh_token=';
          const ca = document.cookie.split(';');
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
              return c.substring(nameEQ.length, c.length);
          }
          return null;
        })();

        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          { refresh_token: refreshToken }
        );

        if (refreshResponse.data.statusCode === 200) {
          const newAccessToken = refreshResponse.data.data.access_token;

          // 새 토큰을 쿠키에 저장
          const expires = new Date();
          expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 1일
          document.cookie = `access_token=${newAccessToken};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;

          // 원래 요청에 새 토큰 설정
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        // 리프레시 실패 시 로그아웃 처리
        document.cookie =
          'access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        document.cookie =
          'refresh_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
