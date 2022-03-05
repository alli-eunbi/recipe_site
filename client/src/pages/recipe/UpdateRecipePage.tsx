import React, { useRef } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import RecipeForm from '../../components/recipes/RecipeForm';

const UpdateRecipePage = () => {
  return (
    <PageLayout>
      <RecipeForm />
    </PageLayout>
  );
};

export default UpdateRecipePage;
