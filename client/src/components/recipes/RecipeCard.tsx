import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HighLight } from '../text/Highlight';

type Props = {
  id?: string | number;
  title: string;
  rating: number;
  kind: string;
  method: string;
  image: string;
  occasion: string;
  onClick?: () => void;
};

const RecipeCard: React.FC<Props> = ({
  image,
  title,
  rating,
  kind,
  method,
  occasion,
  id,
}) => {
  const navigate = useNavigate();

  const [flip, setFlip] = useState(false);
  console.log(flip);

  const handleClickCard: MouseEventHandler = (e) => {
    navigate(`/recipes/${e.currentTarget.id}`);
  };

  return (
    <CardContainer
      className={`card ${flip ? 'flip' : ''}`}
      id={id?.toString()}
      onClick={handleClickCard}
      onMouseEnter={() => setFlip(!flip)}
    >
      <CardPreviewImage
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className='front'>
        <h3>{title}</h3>
        <p>
          <HighLight>종류: </HighLight>
          {kind}
        </p>
      </div>
      <div className='back'>
        <p>
          <HighLight>방법: </HighLight>
          {method}
        </p>
        <HighLight>상황: </HighLight>
        {occasion}
      </div>
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
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  .front {
  }

  .back {
  }
`;

const CardPreviewImage = styled.div`
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px 8px 0 0;
`;
