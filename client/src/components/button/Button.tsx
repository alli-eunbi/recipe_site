import React, { MouseEventHandler, useCallback } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: string;
  onClick?: MouseEventHandler;
  style?: object;
  id?: string;
  disabled?: boolean;
};

type StyleProps = {
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  style,
  onClick,
  children,
  disabled,
  ...rest
}) => {
  return (
    <ButtonContainer
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button`
  color: white;
  font-size: 1rem;
  padding: 0.35rem 1rem;
  background-color: green;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: darkgreen;
  }

  ${({ disabled }: StyleProps) =>
    disabled &&
    css`
      background-color: darkgrey;
      cursor: not-allowed;

      &:hover {
        background-color: darkgrey;
      }
    `}
`;
