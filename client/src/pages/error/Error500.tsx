import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Title } from '../../components/text/Title';

const Error500: React.FC = () => {
  return (
    <PageLayout>
      <Title>이런... 서버에서 공사를 하는 중이에요</Title>
    </PageLayout>
  );
};

export default Error500;
