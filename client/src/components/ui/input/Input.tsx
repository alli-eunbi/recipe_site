import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  Ref,
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
  ref?: Ref<HTMLInputElement>;
};

const Input: React.FC<Props> = React.forwardRef(
  (
    {
      onChange,
      placeholder,
      type,
      name,
      value,
      className,
      style,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
      },
      []
    );

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
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Input;

const InputContainer = styled.input`
  &.modal-input {
    text-align: center;
    width: 50%;
  }

  &.search {
    width: 25rem;
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

  &.register-input {
    width: 15rem;
  }

  &.nickname {
    width: 71.5%;
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

  @media (max-width: 390px) {
    width: 5rem;
  }
`;
