import styled from 'styled-components';
import React from 'react';

const IngredientItem = () => {
  return (
    <IngredientItemWrapper>
      <div>
        <span className='upper'></span>|<span className='lower'></span>
      </div>
    </IngredientItemWrapper>
  );
};

const IngredientItemWrapper = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  height: 2rem;
  border-radius: 2px;
  padding: 0 1rem;
  background-color: green;
  margin-right: 0.5rem;
  transition: all 200ms ease-in 0s;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;
