import React from 'react';
import styled from 'styled-components';
import Category from '../components/category/CategorySearch';
import RecipeList from '../components/recipes/RecipeList';

const SearchPage: React.FC = () => {
  return (
    <PageWrapper>
      <>
        <Category />
        <RecipeList />
      </>
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
