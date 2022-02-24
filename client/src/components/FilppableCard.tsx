import React from 'react';
import styled from 'styled-components';

const FlippableCard = () => {
  return (
    <FCardContainer>
      <div className='inner'>
        <div className='front'></div>
        <div className='back'></div>
      </div>
    </FCardContainer>
  );
};

export default FlippableCard;

const FCardContainer = styled.div`
  width: 15rem;
  height: 20rem;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
