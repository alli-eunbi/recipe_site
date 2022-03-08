import React, { useRef } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import UpdateForm from '../../components/recipes/form/UpdateForm';

const UpdateRecipePage = () => {
  return (
    <PageLayout>
      <UpdateForm />
    </PageLayout>
  );
};

export default UpdateRecipePage;
