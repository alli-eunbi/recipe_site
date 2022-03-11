import React from 'react';
import styled, { css } from 'styled-components';
import { animation } from '../../styles/animation';

type CardProps = {
  children?: JSX.Element | JSX.Element[] | string | number;
  type?: string;
  style?: any;
};

type StyleProps = {
  type?: string;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <CardContainer style={props.style} type={props.type}>
      {props.children}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 15rem;
  height: 20rem;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  animation: fadeIn 0.5s ease-out forwards;
  ${animation};

  @media (max-width: 768px) {
    width: 20rem;
  }

  ${({ type }: StyleProps) =>
    (type === 'register' &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 30rem;
        width: 30rem;
        top: 20%;
        left: 30%;
      `) ||
    (type === 'login' &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 30rem;
        width: 30rem;
        top: 20%;
        left: 30%;
      `)}
`;
