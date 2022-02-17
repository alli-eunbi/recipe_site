import React from 'react';
import styled from 'styled-components';

type Props = {
  type: string;
  placeholder: string;
  id: string;
};

const Input: React.FC<Props> = (props) => {
  return (
    <InputContainer
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
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
