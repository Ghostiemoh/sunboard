import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Overview from './pages/Overview';
import TokenDetail from './pages/TokenDetail';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/token/:tokenId" element={<TokenDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
