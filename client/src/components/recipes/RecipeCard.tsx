import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
};

const RecipeCard: React.FC<Props> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default RecipeCard;

const CardContainer = styled.div`
  width: 15rem;
  height: 20rem;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
