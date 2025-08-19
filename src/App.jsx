import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/home/Home';
import SearchStore from '@/pages/searchstore/SearchStore';
import SearchToilet from '@/pages/SearchToilet';
import SearchToiletUrgent from '@/pages/SearchToiletUrgent';
import RegisterToilet from '@/pages/registerToilet/RegisterToliet';
import AiChatbot from '@/pages/aiChatBot/AiChatbot';
import ReviewToilet from '@/pages/review/ReviewToilet';
import ToiletDetailPage from '@/pages/toiletDetail/ToiletDetailPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
