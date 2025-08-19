import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <Route path='/toilet-detail/:id' element={<ToiletDetailPage/>} />
        <Route path="/review-toilet/:id" element={<ReviewToilet />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
