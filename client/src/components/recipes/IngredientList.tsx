import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../ui/button/Button';

type Props = {
  ingredients?: any;
  className: string;
};

const IngredientList: React.FC<Props> = ({ ingredients, className }) => {
  if (!ingredients) {
    return <p>재료가 없습니다.</p>;
  }
  return (
    <IngredientListContainer className={className}>
      {ingredients.map((ingredient: string, idx: number) => (
        <li key={`${idx}.${ingredient}`}>{ingredient}</li>
      ))}
    </IngredientListContainer>
  );
};

export default IngredientList;

const IngredientListContainer = styled.ol`
  display: flex;
  flex-direction: column;

  > li {
    font-size: 1.1rem;
    color: green;
    margin-bottom: 0.5rem;
  }

  &.analysis {
    margin: 3rem;
  }

  &.additional {
    margin: 1.5rem;
  }
`;
