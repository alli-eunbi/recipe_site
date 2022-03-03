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
import PrivateOutlet from './auth/PrivateOutlet';
import KakaoRedirectPage from './pages/oath/KakaoRedirectPage';
import GoogleRedirectPage from './pages/oath/GoogleRedirectPage';
import { CookiesProvider } from 'react-cookie';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AnalysisResultPage from './pages/AnalysisResultPage';
import WordSearchPage from './pages/WordSearchPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles />
        <Navigation />
        <CookiesProvider>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/image-search' element={<SearchPage />} />
            <Route path='/word-search' element={<WordSearchPage />} />
            <Route path='/search-result' element={<AnalysisResultPage />} />
            <Route path='recipes/:id' element={<RecipeDetailPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateOutlet />}>
              <Route path='/recipe-book' element={<RecipeBookPage />} />
              <Route path='/create-recipe' element={<CreateRecipePage />} />
            </Route>
            <Route path='/about' element={<AboutPage />} />
            <Route
              path='/user/kakao/callback'
              element={<KakaoRedirectPage />}
            />
            <Route
              path='/user/google/callback'
              element={<GoogleRedirectPage />}
            />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
