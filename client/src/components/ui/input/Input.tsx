import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';

type StyleProps = {
  error?: boolean;
};

type Props = {
  type: string;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
  style?: Record<string, unknown>;
  value?: string;
  error?: boolean;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
};

const Input: React.FC<Props> = ({
  onChange,
  placeholder,
  type,
  name,
  value,
  className,
  style,
  onBlur,
  ...rest
}) => {
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  }, []);

  return (
    <InputContainer
      type={type}
      className={className}
      name={name}
      value={value}
      style={style}
      onChange={handleInputChange}
      onBlur={onBlur}
      placeholder={placeholder}
      autoComplete='false'
      {...rest}
    />
  );
};

export default Input;

const InputContainer = styled.input`
  &.search {
    width: 23rem;
    height: 2rem;
    border-radius: 4px;
    border: 1px soild;
    margin: 0;
    text-align: center;
    font-size: 18px;
  }

  &.title {
    width: 400px;
    text-align: center;
  }

  &.login-input {
    width: 12rem;
  }

  &.nickname {
    width: 72%;
  }
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border: none;

  font-size: 1rem;
  width: 100%;
  height: 3rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  ${({ error }: StyleProps) =>
    error &&
    css`
      background-color: #fbe8d2;
    `}
`;
