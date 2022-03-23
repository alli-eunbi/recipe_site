import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: string | boolean;
  onClick?: MouseEventHandler;
  style?: object;
  id?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  className?: string;
};

type StyleProps = {
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  id,
  style,
  type,
  onClick,
  children,
  disabled,
  className,
  ...rest
}) => {
  return (
    <ButtonContainer
      className={className}
      id={id}
      type={type}
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

  &.delete-ingredient {
    padding: 0.5rem;
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

  &.img-slide {
    height: 50px;
    width: 30px;
    border-radius: 25px;
    font-size: 1.5rem;
  }

  &:hover {
    background-color: green;
    box-shadow: 0 6px 20px 0 rgb(0 0 0 / 19%);
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
