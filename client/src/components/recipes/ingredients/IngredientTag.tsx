import styled from 'styled-components';
import React from 'react';

type Props = {
  value: string;
  id: string;
};

const IngredientTag: React.FC<Props> = ({ value, id }) => {
  return (
    <IngredientItemWrapper data-id={id} data-type='tagItem'>
      <span data-id={id} className='upper' data-type='tagItem'>
        {value[0]}
      </span>
      &nbsp;
      <span data-id={id} className='lower' data-type='tagItem'>
        {value[1]} x
      </span>
    </IngredientItemWrapper>
  );
};

export default IngredientTag;
const IngredientItemWrapper = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  height: fit-content;
  width: fit-content;
  border-radius: 8px;
  color: white;
  padding: 0.4rem;
  text-align: center;
  background-color: green;
  transition: all 200ms ease-in 0s;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;
