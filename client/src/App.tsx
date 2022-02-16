import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import MainPage from './pages/MainPage';
import GlobalStyles from './styles/globalStyles';
import UploadPage from './pages/UploadPage';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/search' element={<SearchPage />} />
        {/* <Route path='/auth' element={<AuthPage />} /> */}
      </Routes>
    </RecoilRoot>
  );
}

export default App;
