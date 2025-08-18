import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/home/Home';
import SearchStore from '@/pages/SearchStore';
import SearchToilet from '@/pages/SearchToilet';
import SearchToiletUrgent from '@/pages/SearchToiletUrgent';
import RegisterToilet from '@/pages/registerToilet/RegisterToliet';
import AiChatbot from '@/pages/aiChatBot/AiChatbot';
import ReviewToilet from '@/pages/review/ReviewToilet';
import ToiletDetailPage from '@/pages/toiletDetail/ToiletDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-store" element={<SearchStore />} />
        <Route path="/find-toilet" element={<SearchToilet />} />
        <Route path="/find-toilet/urgent" element={<SearchToiletUrgent />} />
        <Route path="/register-toilet" element={<RegisterToilet />} />
        <Route path="/ai-chatbot" element={<AiChatbot />} />
        <Route path='/toilet-detail/:id' element={<ToiletDetailPage/>} />
        <Route path="/review-toilet" element={<ReviewToilet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
