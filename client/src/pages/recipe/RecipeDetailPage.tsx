import { PageLayout } from '../../components/layout/PageLayout';
import RecipeInfo from '../../components/recipes/RecipeInfo';

const RecipeDetailPage: React.FC = () => {
  return (
    <PageLayout>
      <RecipeInfo />
    </PageLayout>
  );
};

export default RecipeDetailPage;
