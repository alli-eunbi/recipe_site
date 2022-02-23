import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  RefObject,
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
  style?: any;
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
