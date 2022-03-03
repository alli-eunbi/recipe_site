import React from 'react';
import styled from 'styled-components';

type Props = {
  ingredients: string[];
  className: string;
};

const IngredientList: React.FC<Props> = ({ ingredients, className }) => {
  return (
    <IngredientListContainer className={className}>
      {ingredients.map((ingredient, idx) => (
        <li key={`${idx}.${ingredient}`}>{ingredient}</li>
      ))}
    </IngredientListContainer>
  );
};

export default IngredientList;

const IngredientListContainer = styled.ol`
  &.analysis {
    margin: 3rem;

    > li {
      font-size: 1.1rem;
      color: green;
    }
  }

  &.additional {
    margin: 2rem;
    > li {
      font-size: 1.1rem;
      color: green;
    }
  }
`;
