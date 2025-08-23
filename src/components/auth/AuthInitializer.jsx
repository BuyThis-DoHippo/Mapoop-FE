import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/authStore';

const AuthInitializer = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };

    init();
  }, [initializeAuth]);

  // 초기화 중에는 로딩 스피너 표시
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
          <p className="text-body2 text-gray-10">앱을 초기화하는 중...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthInitializer;