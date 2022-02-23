import React, { useEffect } from 'react';
import styled from 'styled-components';
import IngredientItemInput from './IngredientItemInput';

type Props = {
  number: number;
  list: string[];
};

const IngredientList: React.FC<Props> = ({ number }) => {
  const listItems = [];
  for (let i = 0; i < number; i++) {
    listItems.push(<IngredientItemInput />);
  }

  return <IngredientListContainer>{listItems}</IngredientListContainer>;
};

export default IngredientList;

const IngredientListContainer = styled.ul`
  list-style: none;
`;
