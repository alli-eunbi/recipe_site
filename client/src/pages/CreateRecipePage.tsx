import React, { useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import RecipeForm from '../components/recipes/RecipeForm';

const CreateRecipePage: React.FC = () => {
  return (
    <PageLayout>
      <RecipeForm />
    </PageLayout>
  );
};

export default CreateRecipePage;
