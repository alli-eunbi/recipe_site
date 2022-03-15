import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { kindMapper } from '../../../assets/data/kindMapper';
import { HighLight } from '../../text/Highlight';

type Props = {
  id?: string | number;
  title: string;
  rating: number;
  kind: string;
  image: string;
  onClick?: () => void;
};

const RecipeCard: React.FC<Props> = ({ image, title, kind, id }) => {
  const navigate = useNavigate();

  const [flip, setFlip] = useState(false);

  const handleClickCard: MouseEventHandler = (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
        <Symbol src={`images/option/${kindMapper[kind]}.png`} alt={kind} />
        <span>{kind}</span>
      </div>
    </CardContainer>
  );
};

export default RecipeCard;

const Symbol = styled.img`
  width: 8rem;
`;

const CardContainer = styled.div`
  width: 15rem;
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
    top: 0;
    width: 15rem;
    height: 20rem;
    backface-visibility: hidden;

    > h3,
    p {
      margin: 0.5rem;
    }

    > h3 {
      word-break: keep-all;
      font-size: 1.1rem;
    }
  }

  &.card .back {
    position: absolute;
    top: 0;
    width: 15rem;
    height: 20rem;
    backface-visibility: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    span {
      word-break: keep-all;
      font-size: 1.3rem;
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
