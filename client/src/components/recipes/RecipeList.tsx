import styled from 'styled-components';
import React from 'react';
import RecipeCard from './RecipeCard';
import { RecipesLayout } from '../layout/RecipesLayout';
import { HighLight } from '../text/Highlight';

type Props = {
  cardNum?: string[];
};

const RecipeList: React.FC<Props> = () => {
  const cardNum = ['1', '2', '3', '4', '5', '6', '7', '8'];
  if (cardNum.length < 1) {
    return <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>;
  }

  return (
    <RecipesLayout>
      <h2>
        총 <HighLight>{cardNum.length}</HighLight>건의 레시피를 찾았습니다!
      </h2>
      <hr />
      <RecipeListContainer>
        {cardNum.map((number) => (
          <RecipeCard key={number}>{number}</RecipeCard>
        ))}
      </RecipeListContainer>
    </RecipesLayout>
  );
};

export default RecipeList;

const RecipeListContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 1rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  width: fit-content;

  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 970px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
