import React from 'react';
import styled from 'styled-components';
import SearchControl from '../../components/search/SearchControl';

const ImageSearchPage: React.FC = () => {
  return (
    <PageWrapper>
      <SearchControl mode='image' />
    </PageWrapper>
  );
};

export default ImageSearchPage;

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: e4f0ed;
`;
