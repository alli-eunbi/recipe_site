import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';

import AnalysisResult from '../../components/search/AnalysisResult';

const AnalysisResultPage: React.FC = () => {
  return (
    <PageLayout>
      <AnalysisResult />
    </PageLayout>
  );
};

export default AnalysisResultPage;
