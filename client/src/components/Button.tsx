import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: string;
  onClick?: () => void;
  style?: object;
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

  ${({ disabled }: StyleProps) =>
    disabled &&
    css`
      background-color: darkgrey;
    `}
`;
