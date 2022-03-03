import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
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

// type StyleProps = {
//   flip: boolean;
// };

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

  const handleClickCard: MouseEventHandler = (e) => {
    navigate(`/recipes/${e.currentTarget.id}`);
  };

  return (
    <CardContainer
      className={`card ${flip ? 'flip' : ''}`}
      id={id?.toString()}
      onClick={handleClickCard}
      onMouseOver={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
    >
      <div className='front'>
        <CardPreviewImage
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
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
  width: 17rem;
  height: 20rem;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  transition: 0.4s;
  transform: perspective(1000px) rotateY(var(--rotate-y, 0));

  &.card.flip {
    --rotate-y: 180deg;
  }

  &.card .front {
    position: absolute;
    top: 0px;
    width: 17rem;
    height: 20rem;
    backface-visibility: hidden;

    > h3 {
      word-break: keep-all;
    }
  }

  &.card .back {
    position: absolute;
    top: 40%;
    left: -35%;
    width: 17rem;
    height: 20rem;
    backface-visibility: hidden;

    > h3 {
      word-break: keep-all;
    }
  }

  &.card .back {
    transform: rotateY(180deg);
  }
`;

const CardPreviewImage = styled.div`
  width: 100%;
  height: 80%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px 8px 0 0;
`;
