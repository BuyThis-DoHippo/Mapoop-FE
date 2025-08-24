import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/home/Home';
import SearchStore from '@/pages/searchstore/SearchStore';
import SearchToilet from '@/pages/searchToilet/SearchToilet';
import SearchToiletUrgent from '@/pages/searchtoileturgent/SearchToiletUrgent';
import RegisterToilet from '@/pages/registerToilet/RegisterToilet';
import AiChatbot from '@/pages/aiChatBot/AiChatbot';
import ReviewToilet from '@/pages/review/ReviewToilet';
import ToiletDetailPage from '@/pages/toiletDetail/ToiletDetailPage';
import LoginPage from '@/pages/login/LoginPage';
import KakaoCallback from '@/pages/login/KakaoCallback';
import GoogleCallback from '@/pages/login/GoogleCallback';
import ReviewToiletList from '@/pages/review/ReviewToiletList';

// MyPage 관련 import
import MyPage from '@/pages/mypage/MyPage';
import ReviewManagement from '@/pages/mypage/ReviewManagement';
import ToiletManagement from '@/pages/mypage/ToiletManagement';
import ProfileManagement from '@/pages/mypage/ProfileManagement';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-store" element={<SearchStore />} />
        <Route path="/find-toilet" element={<SearchToilet />} />
        <Route path="/find-toilet/urgent" element={<SearchToiletUrgent />} />
        <Route path="/register-toilet" element={<RegisterToilet />} />
        <Route path="/ai-chatbot" element={<AiChatbot />} />
        <Route path="/toilet-detail/:id" element={<ToiletDetailPage />} />
        <Route path="/review-toilet/:id" element={<ReviewToilet />} />
        <Route path="/review-toilet" element={<ReviewToiletList />} />

        {/* 로그인 관련 라우트 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/oauth2/code/google" element={<GoogleCallback />} />

        {/* MyPage 중첩 라우팅 */}
        <Route path="/mypage" element={<MyPage />}>
          {/* /mypage 들어왔을 때 기본적으로 profile로 이동 */}
          <Route index element={<Navigate to="profile" replace />} />

          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="toilets" element={<ToiletManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
