import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import MainPage from './pages/MainPage';
import GlobalStyles from './styles/globalStyles';
import ImageUploadPage from './pages/image-search/ImageUploadPage';
import ImageSearchPage from './pages/image-search/ImageSearchPage';
import { QueryClientProvider, QueryClient } from 'react-query';
import Error404 from './pages/error/Error404';
import CreateRecipePage from './pages/recipe/CreateRecipePage';
import UserRegisterPage from './pages/oath/UserRegisterPage';
import UserLoginPage from './pages/oath/UserLoginPage';
import PrivateOutlet from './auth/PrivateOutlet';
import KakaoRedirectPage from './pages/oath/KakaoRedirectPage';
import GoogleRedirectPage from './pages/oath/GoogleRedirectPage';
import { CookiesProvider } from 'react-cookie';
import RecipeDetailPage from './pages/recipe/RecipeDetailPage';
import AnalysisResultPage from './pages/image-search/AnalysisResultPage';
import WordSearchPage from './pages/word-search/WordSearchPage';
import KindSelectPage from './pages/image-search/KindSelectPage';
import GuidePage from './pages/GuidePage';
import UpdateRecipePage from './pages/recipe/UpdateRecipePage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Navigation />
      <CookiesProvider>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/image-upload' element={<ImageUploadPage />} />
          <Route path='/image-search' element={<ImageSearchPage />} />
          <Route path='/kind-select' element={<KindSelectPage />} />
          <Route path='/word-search' element={<WordSearchPage />} />
          <Route path='/search-result' element={<AnalysisResultPage />} />
          <Route path='recipes/:id' element={<RecipeDetailPage />} />
          <Route path='/register' element={<UserRegisterPage />} />
          <Route path='/login' element={<UserLoginPage />} />
          <Route path='/guide' element={<GuidePage />} />
          <Route path='/user/kakao/callback' element={<KakaoRedirectPage />} />
          <Route
            path='/user/google/callback'
            element={<GoogleRedirectPage />}
          />
          <Route path='/*' element={<Error404 />} />
          <Route element={<PrivateOutlet />}>
            <Route path='/create-recipe' element={<CreateRecipePage />} />
            <Route path='/update-recipe' element={<UpdateRecipePage />} />
          </Route>
        </Routes>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
