import React, { useRef } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import RecipeForm from '../../components/recipes/form/RecipeForm';

const UpdateRecipePage = () => {
  return (
    <PageLayout>
      <RecipeForm />
    </PageLayout>
  );
};

export default UpdateRecipePage;
