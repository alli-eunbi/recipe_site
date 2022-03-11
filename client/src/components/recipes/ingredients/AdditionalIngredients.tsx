import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../../ui/button/Button';

type Props = {
  ingredients: string[];
  onClick: (id: number) => void;
};

const AdditionalIngredients: React.FC<Props> = ({ ingredients, onClick }) => {
  const handleClickDeleteButton: MouseEventHandler = (e) => {
    const targetId = e.currentTarget.id;
    onClick(Number(targetId));
  };

  return (
    <IngredientsContainer>
      {ingredients.map((ingredient: string, idx: number) => (
        <ListItemContainer key={ingredient}>
          <li>{ingredient}</li>
          <Button
            className='delete-ingredient'
            onClick={handleClickDeleteButton}
            id={idx.toString()}
          >
            삭제
          </Button>
        </ListItemContainer>
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

const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;
