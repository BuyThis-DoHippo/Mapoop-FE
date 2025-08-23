import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import { getKakaoLoginUrl, getGoogleLoginUrl } from '@/apis/auth/authApi';
import { useKakaoLogin, useGoogleLogin, useLogout } from './useAuthApi';

export const useAuth = () => {
  const navigate = useNavigate();
  const { 
    isLogin, 
    user, 
    isLoading, 
    error, 
    initializeAuth,
    clearError 
  } = useAuthStore();

  const kakaoLoginMutation = useKakaoLogin();
  const googleLoginMutation = useGoogleLogin();
  const logoutMutation = useLogout();

  // 앱 초기화 시 로그인 상태 확인
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // 카카오 로그인 버튼 클릭
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = getKakaoLoginUrl();
    window.location.href = kakaoLoginUrl;
  };

  // 구글 로그인 버튼 클릭
  const handleGoogleLogin = () => {
    const googleLoginUrl = getGoogleLoginUrl();
    window.location.href = googleLoginUrl;
  };

  // 카카오 로그인 콜백 처리
  const handleKakaoCallback = (code, locationConsent = true) => {
    if (code) {
      kakaoLoginMutation.mutate({ code, locationConsent });
    } else {
      console.error('카카오 로그인 코드가 없습니다.');
      navigate('/login');
    }
  };

  // 구글 로그인 콜백 처리
  const handleGoogleCallback = (code, locationConsent = true) => {
    if (code) {
      googleLoginMutation.mutate({ code, locationConsent });
    } else {
      console.error('구글 로그인 코드가 없습니다.');
      navigate('/login');
    }
  };

  // 로그아웃
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // 로그인 페이지로 이동
  const goToLogin = () => {
    navigate('/login');
  };

  // 에러 초기화
  const handleClearError = () => {
    clearError();
  };

  return {
    // 상태
    isLogin,
    user,
    isLoading: isLoading || kakaoLoginMutation.isPending || googleLoginMutation.isPending || logoutMutation.isPending,
    error: error || kakaoLoginMutation.error || googleLoginMutation.error || logoutMutation.error,

    // 액션
    handleKakaoLogin,
    handleGoogleLogin,
    handleKakaoCallback,
    handleGoogleCallback,
    handleLogout,
    goToLogin,
    handleClearError,

    // 로딩 상태 (개별)
    isKakaoLoading: kakaoLoginMutation.isPending,
    isGoogleLoading: googleLoginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
};