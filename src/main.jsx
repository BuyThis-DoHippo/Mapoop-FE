import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactQueryProvider from './utils/ReactQueryProvider.jsx';
import '@/styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </StrictMode>,
);
