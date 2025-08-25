import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/home/Home';
import SearchStore from '@/pages/searchstore/SearchStore';
import SearchToilet from '@/pages/searchToilet/SearchToilet';
import SearchToiletUrgent from '@/pages/searchtoileturgent/SearchToiletUrgent';
import RegisterToilet from '@/pages/registerToilet/RegisterToilet';
import AiChatbot from '@/pages/aiChatBot/AiChatbot';
import ReviewToilet from '@/pages/review/ReviewToilet';
import ToiletDetailPage from '@/pages/toiletDetail/ToiletDetailPage.jsx';
import LoginPage from '@/pages/login/LoginPage';
import KakaoCallback from '@/pages/login/KakaoCallback';
import GoogleCallback from '@/pages/login/GoogleCallback';
import ReviewToiletList from '@/pages/review/ReviewToiletlist.jsx';

// MyPage 관련 import
import MyPage from '@/pages/mypage/MyPage';
import ReviewManagement from '@/pages/mypage/ReviewManagement';
import ToiletManagement from '@/pages/mypage/ToiletManagement';
import ProfileManagement from '@/pages/mypage/ProfileManagement';

import EditToilet from '@/pages/mypage/EditToilet';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Home />} />

        {/* 검색 관련 */}
        <Route path="/search-store" element={<SearchStore />} />
        <Route path="/find-toilet" element={<SearchToilet />} />
        <Route path="/find-toilet/urgent" element={<SearchToiletUrgent />} />

        {/* 화장실 등록 */}
        <Route path="/register-toilet" element={<RegisterToilet />} />

        {/* AI 챗봇 */}
        <Route path="/ai-chatbot" element={<AiChatbot />} />

        {/* 화장실 상세/리뷰 */}
        <Route path="/toilet-detail/:id" element={<ToiletDetailPage />} />
        <Route path="/review-toilet/:id" element={<ReviewToilet />} />
        <Route path="/review-toilet" element={<ReviewToiletList />} />

        {/* 로그인 관련 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/oauth2/code/google" element={<GoogleCallback />} />

        {/* MyPage 중첩 라우팅 */}
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="toilets" element={<ToiletManagement />} />
        </Route>

        {/* EditToilet 페이지 */}
        <Route path="/edit-toilet/:toiletId" element={<EditToilet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
