import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  RefObject,
  useCallback,
} from 'react';
import { Ref } from 'react';
import styled from 'styled-components';

type RefType<T> = {
  readonly current: T | null;
};

type Props = {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  value?: string;

  ref?: RefType<HTMLInputElement>;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
};

const Input: React.FC<Props> = ({
  onChange,
  placeholder,
  type,
  name,
  value,
  ref,
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
      ref={ref}
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
  width: 15rem;
  height: 3rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;
