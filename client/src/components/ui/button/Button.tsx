import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: string | boolean;
  onClick?: MouseEventHandler;
  style?: object;
  id?: string;
  disabled?: boolean;
  className?: string;
};

type StyleProps = {
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  style,
  onClick,
  children,
  disabled,
  className,
  ...rest
}) => {
  return (
    <ButtonContainer
      className={className}
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
  word-break: keep-all;
  color: white;
  font-size: 1rem;
  background-color: #3fbb70;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &.main {
    height: 3rem;
  }

  &.add-ingredient {
    padding: 0.9rem;
  }

  &.add-tag {
    padding: 0.5rem;
    margin-left: 0.5rem;
  }

  &.add-step {
    padding: 0.5rem;
    margin-bottom: 2rem;
  }

  &.delete {
    height: 12.5rem;
  }

  &.delete-recipe {
    margin-bottom: 1rem;
    padding: 0.5rem 0.5rem;
  }

  &.update-recipe {
    margin-bottom: 1rem;
    padding: 0.5rem 0.5rem;
  }

  &.search {
    padding: 0.35rem 1rem;
  }

  &.submit-register {
    width: 15rem;
    height: 3rem;
    margin-bottom: 1rem;
    padding: 0.35rem 1rem;
  }

  &.submit-login {
    width: 100%;
    height: 3rem;
    margin-bottom: 1rem;
    padding: 0.35rem 1rem;
  }

  &.submit {
    width: 10rem;
    height: 3rem;
    margin-bottom: 1rem;
    padding: 0.35rem 1rem;
  }

  &:hover {
    background-color: green;
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
