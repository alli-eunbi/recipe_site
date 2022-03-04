import React, { useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import RecipeForm from '../components/recipes/RecipeForm';
import Cookies from 'universal-cookie';

const CreateRecipePage: React.FC = () => {
  const cookie = new Cookies();

  useEffect(() => {
    console.log(cookie.get('access_token'));
  }, []);

  return (
    <PageLayout>
      <RecipeForm />
    </PageLayout>
  );
};

export default CreateRecipePage;
