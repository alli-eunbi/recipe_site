import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import RecipeForm from '../../components/recipes/form/RecipeForm';

const CreateRecipePage: React.FC = () => {
  return (
    <PageLayout>
      <RecipeForm />
    </PageLayout>
  );
};

export default CreateRecipePage;
