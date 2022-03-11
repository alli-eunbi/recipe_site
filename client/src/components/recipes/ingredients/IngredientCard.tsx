import React from 'react';
import styled from 'styled-components';
import NutrientChart from '../../chart/NutrientChart';

type Props = {
  ingredient: any;
  calorie: any;
  nutrients: any;
};

const IngredientCard: React.FC<Props> = ({
  ingredient,
  calorie,
  nutrients,
}) => {
  return (
    <IngredientCardContainer>
      <div>
        <p>{ingredient}</p>
        <p>칼로리: {calorie}kcal</p>
        <span>(100g 기준)</span>
      </div>
      <NutrientChart nutrients={nutrients} />
    </IngredientCardContainer>
  );
};

export default IngredientCard;

const IngredientCardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  margin: 1rem;
  width: fit-content;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: 400ms ease;

  :hover {
    transform: scale(1.05);
  }

  > div > p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;
