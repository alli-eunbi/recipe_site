import React from 'react';
import styled from 'styled-components';
import ShopIngredientItem from './ShopIngredientItem';

type Props = {
  ingredients: string[];
};

const ShopIngredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <ShopIngredientsContainer>
      {ingredients.map((ingredient: string) => (
        <ShopIngredientItem ingredient={ingredient} />
      ))}
    </ShopIngredientsContainer>
  );
};

export default ShopIngredients;

const ShopIngredientsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 2rem;
`;
