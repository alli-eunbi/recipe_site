import React from 'react';
import styled from 'styled-components';

type Props = {
  ingredients: string[];
};

const AdditionalIngredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <IngredientsContainer>
      {ingredients.map((ingredient: string) => (
        <li key={ingredient}>{ingredient}</li>
      ))}
    </IngredientsContainer>
  );
};

export default AdditionalIngredients;

const IngredientsContainer = styled.ol`
  > li {
    margin: 1em;
  }
`;
