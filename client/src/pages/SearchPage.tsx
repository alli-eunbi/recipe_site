import React from 'react';
import styled from 'styled-components';
import CategoryFilter from '../components/category/CategoryFilter';
import Card from '../components/Card';

const SearchPage: React.FC = () => {
  return (
    <main>
      <CategoryFilter />
      <RecipeListContainer>
        <Card>하나</Card>
        <Card>둘</Card>
        <Card>셋</Card>
        <Card>넷</Card>
      </RecipeListContainer>
    </main>
  );
};

export default SearchPage;

const RecipeListContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 4rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  width: fit-content;
`;
