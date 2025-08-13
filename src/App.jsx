import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchStore from './pages/SearchStore';
import SearchToilet from './pages/SearchToilet';
import SearchToiletUrgent from './pages/SearchToiletUrgent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-store" element={<SearchStore />} />
      <Route path="/find-toilet" element={<SearchToilet />} />
      <Route path="/find-toilet/urgent" element={<SearchToiletUrgent />} />
    </Routes>
  );
}

export default App;
