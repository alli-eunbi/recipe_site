import { PageLayout } from '../../components/layout/PageLayout';
import RecipeInfo from '../../components/recipes/details/RecipeInfo';

const RecipeDetailPage: React.FC = () => {
  return (
    <PageLayout>
      <RecipeInfo />
    </PageLayout>
  );
};

export default RecipeDetailPage;
