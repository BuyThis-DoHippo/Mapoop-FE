import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const [showLocationConsent, setShowLocationConsent] = useState(false);
  const [locationConsent, setLocationConsent] = useState(true);
  const { handleGoogleCallback, isGoogleLoading } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('구글 로그인 에러:', error);
      alert('구글 로그인이 취소되었거나 오류가 발생했습니다.');
      window.location.href = '/login';
      return;
    }

    if (code) {
      // 위치 동의 확인 모달 표시
      setShowLocationConsent(true);
    } else {
      console.error('구글 로그인 코드가 없습니다.');
      window.location.href = '/login';
    }
  }, [searchParams]);

  const handleLocationConsentSubmit = () => {
    const code = searchParams.get('code');
    handleGoogleCallback(code, locationConsent);
    setShowLocationConsent(false);
  };

  if (showLocationConsent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white border border-gray-2 rounded-lg shadow-lg">
          <h2 className="text-heading2 text-gray-10 text-center mb-6">
            위치 정보 제공 동의
          </h2>
          
          <p className="text-body1 text-gray-7 text-center mb-6">
            더 정확한 화장실 정보를 제공하기 위해 위치 정보 사용에 동의해주세요.
          </p>
          
          <div className="mb-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={locationConsent}
                onChange={(e) => setLocationConsent(e.target.checked)}
                className="w-5 h-5 text-main focus:ring-main border-gray-3 rounded"
              />
              <span className="text-body2 text-gray-9">
                위치 정보 제공에 동의합니다
              </span>
            </label>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/login'}
              className="flex-1 py-3 bg-gray-2 text-gray-7 rounded-lg hover:bg-gray-3 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleLocationConsentSubmit}
              disabled={isGoogleLoading}
              className="flex-1 py-3 bg-main text-white rounded-lg hover:bg-main-2 transition-colors disabled:opacity-50"
            >
              {isGoogleLoading ? '처리 중...' : '확인'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {isGoogleLoading ? (
          <>
            <div className="w-16 h-16 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
            <p className="text-body1 text-gray-10">구글 로그인 처리 중...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-gray-3 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-body1 text-gray-10">로그인 처리 중...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;