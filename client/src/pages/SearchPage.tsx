import React from 'react';
import styled from 'styled-components';
import Category from '../components/search/Category';
import RecipeList from '../components/recipes/RecipeList';
import SearchForm from '../components/search/SearchForm';

const SearchPage: React.FC = () => {
  return (
    <PageWrapper>
      <SearchForm />
      <Category />
      <RecipeList />
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
