import React from 'react';
import styled from 'styled-components';
import { PageLayout } from '../components/layout/PageLayout';

const GuidePage: React.FC = () => {
  return (
    <PageLayout>
      <GuideContainer>
        <GuideHeader>
          <h2>채식</h2>
          <p>건강한 채식을 할 수 있는 방법 소개</p>
        </GuideHeader>
      </GuideContainer>
    </PageLayout>
  );
};

export default GuidePage;

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: 40rem;
  height: 30rem;
  border-radius: 8px;
`;

const GuideHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
