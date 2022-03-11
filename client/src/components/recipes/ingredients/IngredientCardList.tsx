import React from 'react';
import styled from 'styled-components';
import IngredientCard from './IngredientCard';

type Props = {
  ingredients?: string[];
  nutrients?: any;
  calories?: any;
  className: string;
};

const IngredientList: React.FC<Props> = ({
  ingredients,
  nutrients,
  calories,
  className,
}) => {
  if (!ingredients) {
    return <p>재료가 없습니다.</p>;
  }

  return (
    <IngredientListContainer className={className}>
      {calories.map((calories: any, idx: number) => (
        <IngredientCard
          key={ingredients[idx]}
          ingredient={ingredients[idx]}
          calorie={calories}
          nutrients={nutrients[idx]}
        />
      ))}
    </IngredientListContainer>
  );
};

export default IngredientList;

const IngredientListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

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

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;
