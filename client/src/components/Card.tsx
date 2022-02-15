import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

type CardProps = {
  children?: ReactElement | ReactElement[] | string;
  type?: string;
};

type StyleProps = {
  type?: string;
};

const Card: React.FC<CardProps> = (props) => {
  return <CardContainer type={props.type}>{props.children}</CardContainer>;
};

export default Card;

const CardContainer = styled.div`
  width: 15rem;
  height: 20rem;
  margin: 20px;
  background-color: grey;
  border-radius: 8px;

  ${({ type }: StyleProps) =>
    (type === 'auth' &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 30rem;
        width: 30rem;
        top: 20%;
        left: 30%;
      `) ||
    (type === 'upload' &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 30rem;
        width: 30rem;
        top: 20%;
        left: 30%;
      `)}
`;
