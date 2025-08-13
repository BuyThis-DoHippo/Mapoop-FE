import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchStore from './pages/SearchStore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-store" element={<SearchStore />} />
    </Routes>
  );
}

export default App;
