import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getKakaoAccessToken,
  kakaoLogin,
  getGoogleAccessToken,
  googleLogin,
  logout,
  getUserInfo,
  updateLocationConsent,
  deleteUser,
} from '@/apis/auth/authApi';
import useAuthStore from '@/stores/authStore';

// --- Helper function to set cookies ---
const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    name + '=' + (value || '') + expires + '; path=/; SameSite=Strict; Secure';
};

// --- Helper function to remove cookies ---
const removeCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// 카카오 로그인 mutation
export const useKakaoLogin = () => {
  const { handleLoginSuccess } = useAuthStore();

  return useMutation({
    mutationFn: async ({ code, locationConsent = true }) => {
      const kakaoAccessToken = await getKakaoAccessToken(code);
      const result = await kakaoLogin(kakaoAccessToken, locationConsent);
      return result;
    },
    onSuccess: async (data) => {
      if (data && data.data) {
        const { access_token, refresh_token } = data.data;
        setCookie('access_token', access_token, 1);
        setCookie('refresh_token', refresh_token, 7);
      }
      const success = await handleLoginSuccess(data);
      if (success) {
        window.location.href = '/';
      }
    },
    onError: () => {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      window.location.href = '/login';
    },
  });
};

// 구글 로그인 mutation
export const useGoogleLogin = () => {
  const { handleLoginSuccess } = useAuthStore();

  return useMutation({
    mutationFn: async ({ code, locationConsent = true }) => {
      const googleAccessToken = await getGoogleAccessToken(code);
      const result = await googleLogin(googleAccessToken, locationConsent);
      return result;
    },
    onSuccess: async (data) => {
      if (data && data.data) {
        const { access_token, refresh_token } = data.data;
        setCookie('access_token', access_token, 1);
        setCookie('refresh_token', refresh_token, 7);
      }
      const success = await handleLoginSuccess(data);
      if (success) {
        window.location.href = '/';
      }
    },
    onError: () => {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      window.location.href = '/login';
    },
  });
};

// 로그아웃 mutation
export const useLogout = () => {
  const { logout: storeLogout } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeCookie('access_token');
      removeCookie('refresh_token');
      await storeLogout();
      window.location.href = '/login';
    },
    onError: () => {
      removeCookie('access_token');
      removeCookie('refresh_token');
      storeLogout();
      window.location.href = '/login';
    },
  });
};

// 사용자 정보 조회 query
export const useUserInfo = () => {
  const { isLogin } = useAuthStore();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: isLogin,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: false,
  });
};

// 위치정보 동의 업데이트 mutation
export const useUpdateLocationConsent = () => {
  return useMutation({
    mutationFn: ({ locationConsent, version }) =>
      updateLocationConsent(locationConsent, version),
  });
};

// 회원 탈퇴 mutation
export const useDeleteUser = () => {
  const { logout: storeLogout } = useAuthStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      removeCookie('access_token');
      removeCookie('refresh_token');
      await storeLogout();
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/';
    },
    onError: () => {
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
  });
};
