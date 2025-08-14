import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchStore from './pages/SearchStore';
import SearchToilet from './pages/SearchToilet';
import SearchToiletUrgent from './pages/SearchToiletUrgent';
import RegisterToilet from './pages/RegisterToliet';
import AiChatbot from './pages/AiChatbot';
import ReviewToilet from './pages/ReviewToilet';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-store" element={<SearchStore />} />
      <Route path="/find-toilet" element={<SearchToilet />} />
      <Route path="/find-toilet/urgent" element={<SearchToiletUrgent />} />
      <Route path="/register-toilet" element={<RegisterToilet />} />
      <Route path="/ai-chatbot" element={<AiChatbot />} />
      <Route path="/review-toilet" element={<ReviewToilet />} />
    </Routes>
  );
}

export default App;
