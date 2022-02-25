import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  id?: string | number;
  onClick?: any;
};

const RecipeCard: React.FC<Props> = ({ children, id }) => {
  const navigate = useNavigate();

  const handleClickCard = (e: any) => {
    navigate(`/recipes/${e.currentTarget.id}`);
  };

  return (
    <CardContainer id={id?.toString()} onClick={handleClickCard}>
      {children}
    </CardContainer>
  );
};

export default RecipeCard;

const CardContainer = styled.div`
  width: 15rem;
  height: 20rem;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  cursor: pointer;
`;
