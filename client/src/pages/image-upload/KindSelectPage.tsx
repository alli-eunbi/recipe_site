import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import KindSelect from '../../components/search/KindSelect';

const KindSelectPage: React.FC = () => {
  return (
    <PageLayout>
      <KindSelect />
    </PageLayout>
  );
};

export default KindSelectPage;
