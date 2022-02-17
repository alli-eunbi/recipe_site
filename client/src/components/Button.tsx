import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: string;
  onClick?: MouseEvent;
};

type StyleProps = {
  mode?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  const handleClick = useCallback(() => {
    onClick;
  }, [onClick]);
  return (
    <ButtonContainer onClick={handleClick} {...rest}>
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

  ${({ mode }: StyleProps) =>
    mode === 'login' &&
    css`
      background-color: darkgrey;
      width: 50%;
    `}
`;
