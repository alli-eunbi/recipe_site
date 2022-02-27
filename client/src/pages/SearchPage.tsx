import React from 'react';
import styled from 'styled-components';
import SearchControl from '../components/search/SearchControl';

const SearchPage: React.FC = () => {
  return (
    <PageWrapper>
      <SearchControl />
    </PageWrapper>
  );
};

export default SearchPage;

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcfceb;
`;
