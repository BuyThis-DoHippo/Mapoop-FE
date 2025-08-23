import { create } from 'zustand';
import { getUserInfo, logout as logoutApi, refreshToken as refreshTokenApi } from '@/apis/auth/authApi';

// 토큰을 쿠키에 저장/조회하는 유틸 함수들
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

const useAuthStore = create((set, get) => ({
  // 상태
  isLogin: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  // 로그인 상태 설정
  setLoginState: (isLogin, user = null, tokens = null) => {
    if (tokens) {
      // 토큰을 쿠키에 저장
      setCookie('access_token', tokens.access_token, 1); // 1일
      setCookie('refresh_token', tokens.refresh_token, 7); // 7일
    }
    
    set({ 
      isLogin, 
      user,
      accessToken: tokens?.access_token || null,
      refreshToken: tokens?.refresh_token || null,
      error: null 
    });
  },

  // 토큰 가져오기
  getTokens: () => ({
    accessToken: getCookie('access_token'),
    refreshToken: getCookie('refresh_token'),
  }),

  // 사용자 정보 가져오기
  fetchUserInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getUserInfo();
      if (response.statusCode === 200) {
        set({ 
          isLogin: true, 
          user: response.data,
          isLoading: false 
        });
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      set({ 
        isLogin: false, 
        user: null,
        isLoading: false,
        error: error.response?.data?.message || error.message 
      });
      return null;
    }
  },

  // 로그인 성공 처리
  handleLoginSuccess: async (loginResponse) => {
    set({ isLoading: true, error: null });
    try {
      if (loginResponse.statusCode === 200) {
        const { access_token, refresh_token, user } = loginResponse.data;
        
        // 토큰과 사용자 정보 저장
        get().setLoginState(true, user, { access_token, refresh_token });
        
        set({ isLoading: false });
        return true;
      }
      throw new Error(loginResponse.message || '로그인에 실패했습니다.');
    } catch (error) {
      console.error('로그인 처리 실패:', error);
      set({ 
        isLogin: false, 
        user: null,
        isLoading: false,
        error: error.message 
      });
      return false;
    }
  },

  // 토큰 갱신
  refreshTokens: async () => {
    const refreshToken = getCookie('refresh_token');
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    try {
      const response = await refreshTokenApi(refreshToken);
      if (response.statusCode === 200) {
        const { access_token } = response.data;
        setCookie('access_token', access_token, 1);
        set({ accessToken: access_token });
        return access_token;
      }
      throw new Error(response.message);
    } catch (error) {
      // 토큰 갱신 실패 시 로그아웃 처리
      get().logout();
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutApi();
    } catch (error) {
      console.error('로그아웃 API 실패:', error);
      // 로그아웃은 실패해도 상태는 초기화
    }
    
    // 쿠키에서 토큰 삭제
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    
    set({ 
      isLogin: false, 
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false 
    });
    return true;
  },

  // 에러 초기화
  clearError: () => {
    set({ error: null });
  },

  // 앱 초기화 시 로그인 상태 확인
  initializeAuth: async () => {
    const tokens = get().getTokens();
    if (tokens.accessToken) {
      // 토큰이 있으면 사용자 정보 조회 시도
      set({ 
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken 
      });
      await get().fetchUserInfo();
    }
  },
}));

export default useAuthStore;