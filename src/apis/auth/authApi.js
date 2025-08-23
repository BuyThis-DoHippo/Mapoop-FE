import axiosInstance from '@/apis/instance';

// 카카오 로그인 URL 생성
export const getKakaoLoginUrl = () => {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  
  return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
};

// 카카오 액세스 토큰 받기
export const getKakaoAccessToken = async (code) => {
  console.log('카카오 액세스 토큰 요청:', { code });
  
  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      code: code,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('카카오 액세스 토큰 발급 실패:', errorData);
    throw new Error('카카오 액세스 토큰 발급 실패');
  }

  const data = await response.json();
  console.log('카카오 액세스 토큰 발급 성공');
  return data.access_token;
};

// 카카오 로그인 (액세스 토큰으로 로그인)
export const kakaoLogin = async (kakaoAccessToken, locationConsent = true) => {
  const requestData = {
    kakaoAccessToken: kakaoAccessToken,
    location_consent: locationConsent,
    location_consent_version: "1.0"
  };
  
  console.log('카카오 로그인 요청 전체 데이터:', requestData);
  console.log('액세스 토큰 길이:', kakaoAccessToken?.length);
  console.log('액세스 토큰 타입:', typeof kakaoAccessToken);
  console.log('location_consent 타입:', typeof locationConsent);
  console.log('location_consent_version 타입:', typeof "1.0");
  
  try {
    const response = await axiosInstance.post('/api/auth/kakao/login', requestData);
    console.log('카카오 로그인 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 API 에러:', error);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 상태코드:', error.response?.status);
    console.error('에러 헤더:', error.response?.headers);
    throw error;
  }
};

// 구글 로그인 URL 생성
export const getGoogleLoginUrl = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const scope = 'openid email profile';
  
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
};

// 구글 액세스 토큰 받기
export const getGoogleAccessToken = async (code) => {
  console.log('구글 액세스 토큰 요청:', { code });
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      code: code,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('구글 액세스 토큰 발급 실패:', errorData);
    throw new Error('구글 액세스 토큰 발급 실패');
  }

  const data = await response.json();
  console.log('구글 액세스 토큰 발급 성공');
  return data.access_token;
};

// 구글 로그인 (액세스 토큰으로 로그인)
export const googleLogin = async (googleAccessToken, locationConsent = true) => {
  console.log('구글 로그인 요청:', { 
    googleAccessToken: googleAccessToken?.substring(0, 10) + '...',
    location_consent: locationConsent,
    location_consent_version: "1.0" 
  });
  
  const response = await axiosInstance.post('/api/auth/google/login', {
    googleAccessToken: googleAccessToken,
    location_consent: locationConsent,
    location_consent_version: "1.0"
  });
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};

// 토큰 갱신
export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post('/api/auth/refresh', {
    refresh_token: refreshToken
  });
  return response.data;
};

// 사용자 정보 조회
export const getUserInfo = async () => {
  const response = await axiosInstance.get('/api/users/me');
  return response.data;
};

// 위치정보 동의 업데이트
export const updateLocationConsent = async (locationConsent, version = "1.0") => {
  const response = await axiosInstance.patch('/api/users/me/location-consent', {
    location_consent: locationConsent,
    location_consent_version: version
  });
  return response.data;
};

// 회원 탈퇴
export const deleteUser = async () => {
  const response = await axiosInstance.delete('/api/users/me');
  return response.data;
};

// 내가 등록한 화장실 조회
export const getMyToilets = async () => {
  const response = await axiosInstance.get('/api/users/me/toilets');
  return response.data;
};