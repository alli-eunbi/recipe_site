import React from 'react';
import styled from 'styled-components';
import SearchControl from '../../components/search/SearchControl';

const WordSearchPage: React.FC = () => {
  return (
    <PageWrapper>
      <SearchControl mode='word' />
    </PageWrapper>
  );
};

export default WordSearchPage;

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: e4f0ed;
`;
