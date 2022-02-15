import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import MainPage from './pages/MainPage';
import GlobalStyles from './styles/globalStyles';
import UploadPage from './pages/UploadPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
