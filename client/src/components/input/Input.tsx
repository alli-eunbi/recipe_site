import React, { ChangeEvent, ChangeEventHandler, useCallback } from 'react';
import styled from 'styled-components';

type Props = {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  onChange?: ChangeEventHandler;
};

const Input: React.FC<Props> = ({
  onChange,
  placeholder,
  type,
  name,
  ...rest
}) => {
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  }, []);

  return (
    <InputContainer
      type={type}
      name={name}
      onChange={handleInputChange}
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
