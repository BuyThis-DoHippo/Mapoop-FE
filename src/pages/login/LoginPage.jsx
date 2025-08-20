import KakaoLogin from '@/assets/svg/login/kakao-login.svg?react';
import GoogleLogo from '@/assets/svg/login/google-logo.svg?react';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직
    console.log('카카오 로그인');
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직
    console.log('구글 로그인');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 컨텐츠 */}
      <div className="flex justify-center pt-[243px]">
        <div className="w-[600px] flex flex-col items-center gap-20">
          {/* 제목 */}
          <h1 className="text-heading1 text-gray-10 text-center">로그인</h1>
          
          {/* 로그인 버튼들 */}
          <div className="w-full flex flex-col gap-8">
            {/* 카카오 로그인 */}
            <button
              onClick={handleKakaoLogin}
              className="w-full h-[90px]"
            >
              <KakaoLogin/>
            </button>
            
            {/* 구글 로그인 */}
            <button
              onClick={handleGoogleLogin}
              className="w-full h-[90px] bg-white rounded-[10px] border border-gray-2 relative flex items-center justify-center"
            >
              <GoogleLogo className="w-[45px] h-[45px] absolute left-[23px]" />
              <span className="text-[28px] text-gray-10 font-normal leading-[42px] absolute right-[218px]">구글 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;