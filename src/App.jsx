import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchStore from './pages/SearchStore';
import SearchToilet from './pages/SearchToilet';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-store" element={<SearchStore />} />
      <Route path="/find-toilet" element={<SearchToilet />} />
    </Routes>
  );
}

export default App;
