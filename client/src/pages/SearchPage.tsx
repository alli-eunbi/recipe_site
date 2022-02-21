import React from 'react';
import styled from 'styled-components';
import Category from '../components/category/CategorySearch';
import { RecipesLayout } from '../components/layout/RecipesLayout';
import { HighLight } from '../components/text/Highlight';
import RecipeList from '../components/recipes/RecipeList';

const SearchPage: React.FC = () => {
  const cardNum = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return (
    <PageWrapper>
      <>
        <Category />
        <RecipesLayout>
          <h2>
            총 <HighLight>{cardNum.length}</HighLight>건의 레시피를 찾았습니다!
          </h2>
          <hr />
          <RecipeList cardNum={cardNum} />
        </RecipesLayout>
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
