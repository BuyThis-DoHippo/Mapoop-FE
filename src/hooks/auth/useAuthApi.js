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
  getMyToilets
} from '@/apis/auth/authApi';
import useAuthStore from '@/stores/authStore';

// 카카오 로그인 mutation
export const useKakaoLogin = () => {
  const { handleLoginSuccess } = useAuthStore();
  
  return useMutation({
    mutationFn: async ({ code, locationConsent = true }) => {
      try {
        // 1. 인가 코드로 액세스 토큰 받기
        console.log('1단계: 카카오 액세스 토큰 받기 시작');
        const kakaoAccessToken = await getKakaoAccessToken(code);
        
        // 2. 액세스 토큰으로 로그인
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
      const success = await handleLoginSuccess(data);
      if (success) {
        // 로그인 성공 시 메인 페이지로 리다이렉트
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('카카오 로그인 실패:', error);
      let errorMessage = '카카오 로그인에 실패했습니다.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    },
  });
};

// 구글 로그인 mutation
export const useGoogleLogin = () => {
  const { handleLoginSuccess } = useAuthStore();
  
  return useMutation({
    mutationFn: async ({ code, locationConsent = true }) => {
      try {
        // 1. 인가 코드로 액세스 토큰 받기
        console.log('1단계: 구글 액세스 토큰 받기 시작');
        const googleAccessToken = await getGoogleAccessToken(code);
        
        // 2. 액세스 토큰으로 로그인
        console.log('2단계: 백엔드 로그인 시작');
        const result = await googleLogin(googleAccessToken, locationConsent);
        
        return result;
      } catch (error) {
        console.error('구글 로그인 과정에서 에러 발생:', error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      console.log('구글 로그인 API 응답:', data);
      const success = await handleLoginSuccess(data);
      if (success) {
        // 로그인 성공 시 메인 페이지로 리다이렉트
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('구글 로그인 실패:', error);
      let errorMessage = '구글 로그인에 실패했습니다.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    },
  });
};

// 로그아웃 mutation
export const useLogout = () => {
  const { logout: storeLogout } = useAuthStore();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await storeLogout();
      // 로그아웃 성공 시 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      // 로그아웃은 실패해도 상태는 초기화하고 로그인 페이지로
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
    enabled: isLogin, // 로그인 상태일 때만 호출
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
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
      await storeLogout();
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴에 실패했습니다.');
    },
  });
};

// 내가 등록한 화장실 조회 query
export const useMyToilets = () => {
  const { isLogin } = useAuthStore();
  
  return useQuery({
    queryKey: ['myToilets'],
    queryFn: getMyToilets,
    enabled: isLogin,
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
  });
};