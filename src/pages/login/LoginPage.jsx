import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from '@/assets/svg/login/kakao-login.svg?react';
import GoogleLogo from '@/assets/svg/login/google-logo.svg?react';
import { useAuth } from '@/hooks/auth/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { 
    isLogin, 
    handleKakaoLogin, 
    handleGoogleLogin, 
    isLoading,
    error,
    handleClearError 
  } = useAuth();

  // 이미 로그인된 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isLogin) {
      navigate('/', { replace: true });
    }
  }, [isLogin, navigate]);

  // 에러 처리
  useEffect(() => {
    if (error) {
      console.error('로그인 에러:', error);
      // 에러 메시지 표시 후 초기화
      setTimeout(() => {
        handleClearError();
      }, 3000);
    }
  }, [error, handleClearError]);

  const handleKakaoClick = () => {
    if (isLoading) return;
    handleKakaoLogin();
  };

  const handleGoogleClick = () => {
    if (isLoading) return;
    handleGoogleLogin();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 컨텐츠 */}
      <div className="flex justify-center pt-[243px]">
        <div className="w-[600px] flex flex-col items-center gap-20">
          {/* 제목 */}
          <h1 className="text-heading1 text-gray-10 text-center">로그인</h1>
          
          {/* 에러 메시지 */}
          {error && (
            <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-body2 text-red-600 text-center">
                {typeof error === 'object' ? error.message : error}
              </p>
            </div>
          )}
          
          {/* 로그인 버튼들 */}
          <div className="w-full flex flex-col gap-8">
            {/* 카카오 로그인 */}
            <button
              onClick={handleKakaoClick}
              disabled={isLoading}
              className={`w-full h-[90px] transition-opacity ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              <KakaoLogin />
            </button>
            
            {/* 구글 로그인 */}
            <button
              onClick={handleGoogleClick}
              disabled={isLoading}
              className={`w-full h-[90px] bg-white rounded-[10px] border border-gray-2 relative flex items-center justify-center transition-opacity ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              <GoogleLogo className="w-[45px] h-[45px] absolute left-[23px]" />
              <span className="text-[28px] text-gray-10 font-normal leading-[42px] absolute right-[218px]">
                구글 로그인
              </span>
            </button>
          </div>

          {/* 로딩 상태 */}
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-main border-t-transparent rounded-full animate-spin"></div>
              <span className="text-body2 text-gray-10">로그인 처리 중...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;