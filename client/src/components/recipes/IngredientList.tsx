import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../ui/button/Button';

type Props = {
  ingredients: string[];
  className: string;
};

const IngredientList: React.FC<Props> = ({ ingredients, className }) => {
  if (!ingredients) {
    return <div>재료가 없습니다.</div>;
  }
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
  display: flex;
  flex-direction: column;
  align-items: stretch;

  > li {
    font-size: 1.1rem;
    color: green;
    margin-bottom: 0.5rem;
  }

  &.analysis {
    margin: 3rem;
  }

  &.additional {
    margin: 2rem;
  }
`;
