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

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict; Secure";
};

const removeCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


// 카카오 로그인 mutation
export const useKakaoLogin = () => {
  const { handleLoginSuccess } = useAuthStore();

  return useMutation({
    mutationFn: async ({ code, locationConsent = true }) => {
      try {
        console.log('1단계: 카카오 액세스 토큰 받기 시작');
        const kakaoAccessToken = await getKakaoAccessToken(code);

        console.log('2단계: 백엔드 로그인 시작');
        const result = await kakaoLogin(kakaoAccessToken, locationConsent);

        return result;
      } catch (error) {
        console.error('카카오 로그인 과정에서 에러 발생:', error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      console.log('로그인 API 응답:', data);
      if (data && data.data) {
        // 'access_token'을 'accessToken'으로, 'refresh_token'을 'refreshToken'으로 수정
        const { accessToken, refreshToken } = data.data; 
        setCookie('access_token', accessToken, 1); 
        setCookie('refresh_token', refreshToken, 7);
      }
      const success = await handleLoginSuccess(data);
      if (success) {
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('카카오 로그인 실패:', error);
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
      try {
        console.log('1단계: 구글 액세스 토큰 받기 시작');
        const googleAccessToken = await getGoogleAccessToken(code);

        console.log('2단계: 백엔드 로그인 시작');
        const result = await googleLogin(googleAccessToken, locationConsent);
        return result;
      } catch (error) {
        console.error('구글 로그인 과정에서 에러 발생:', error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      if (data && data.data) {
        const { access_token, refresh_token } = data.data; // 문제의 부분
        setCookie('access_token', access_token, 1);
        setCookie('refresh_token', refresh_token, 7);
      }
      const success = await handleLoginSuccess(data);
      if (success) {
        window.location.href = '/';
      }
    },

    onError: (error) => {
      console.error('구글 로그인 실패:', error);
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
    onError: (error) => {
      console.error('로그아웃 실패:', error);
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
    onSuccess: (data) => {
      console.log('위치정보 동의 업데이트 성공:', data);
    },
    onError: (error) => {
      console.error('위치정보 동의 업데이트 실패:', error);
    },
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
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
  });
};