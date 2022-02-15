import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: string;
};

type StyleProps = {
  type: string;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <ButtonContainer type='login'>
      <button>{children}</button>
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.div`
  text-align: center;

  & > button {
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background-color: green;
    border: none;
    cursor: pointer;
  }

  ${({ type }: StyleProps) =>
    type === 'login' &&
    css`
      & > button {
        width: 100%;
      }
    `}
`;
