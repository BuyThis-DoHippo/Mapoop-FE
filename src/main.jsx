import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactQueryProvider from './utils/ReactQueryProvider.jsx';
import '@/styles/globals.css';
import App from './App.jsx';

// 앱 시작 시 인증 상태 확인을 위한 컴포넌트
import AuthInitializer from './components/auth/AuthInitializer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactQueryProvider>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </ReactQueryProvider>
  </StrictMode>,
);