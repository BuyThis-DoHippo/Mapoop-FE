import { create } from 'zustand';
import { getUserInfo } from '@/apis/auth/authApi';

// --- Helper function to get cookie ---
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

// --- Helper function to set cookie ---
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict; Secure";
};

// --- Helper function to remove cookie ---
const removeCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


const useAuthStore = create((set, get) => ({
  isLogin: false,
  user: null,
  isLoading: true,
  error: null,

  // ✅ **MODIFIED: App initialization logic**
  initializeAuth: async () => {
    const accessToken = getCookie('access_token');
    // If no token, finish loading and stay logged out.
    if (!accessToken) {
      set({ isLogin: false, user: null, isLoading: false });
      return;
    }

    try {
      // If token exists, try to fetch user info.
      const userInfoResponse = await getUserInfo();
      if (userInfoResponse && userInfoResponse.data) {
        set({
          isLogin: true,
          user: userInfoResponse.data,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('사용자 정보 조회 실패');
      }
    } catch (error) {
      console.error('인증 초기화 실패:', error);
      // If fetching user fails (e.g., token expired), log out.
      get().logout();
      set({ isLoading: false });
    }
  },

  handleLoginSuccess: async (loginResponse) => {
    const { accessToken, refreshToken, user } = loginResponse.data;

    if (!accessToken || !refreshToken) {
      set({
        isLogin: false,
        user: null,
        isLoading: false,
        error: '로그인에 실패했습니다: 토큰이 없습니다.',
      });
      return false;
    }

    // Store tokens in cookies
    setCookie('access_token', accessToken, 1); // 1 day
    setCookie('refresh_token', refreshToken, 7); // 7 days

    // Update state
    set({ isLogin: true, user: user, isLoading: false, error: null });
    return true;
  },

  logout: () => {
    removeCookie('access_token');
    removeCookie('refresh_token');
    set({ isLogin: false, user: null, isLoading: false, error: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;