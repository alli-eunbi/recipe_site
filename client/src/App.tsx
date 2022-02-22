import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import MainPage from './pages/MainPage';
import GlobalStyles from './styles/globalStyles';
import UploadPage from './pages/UploadPage';
import SearchPage from './pages/SearchPage';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import AboutPage from './pages/AboutPage';
import Error404 from './pages/error/Error404';
import RecipeBookPage from './pages/RecipeBookPage';
import CreateRecipePage from './pages/CreateRecipePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles />
        <Navigation />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/upload' element={<UploadPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/recipe-book' element={<RecipeBookPage />} />
          <Route path='/create-recipe' element={<CreateRecipePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
