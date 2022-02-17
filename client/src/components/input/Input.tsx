import React from 'react';
import styled from 'styled-components';

type InputProps = {
  type: string;
  placeholder: string;
  id: string;
};

const FormInput: React.FC<InputProps> = (props) => {
  return (
    <Input type={props.type} id={props.id} placeholder={props.placeholder} />
  );
};

export default FormInput;

const Input = styled.input`
  font-size: 1rem;
  width: 15rem;
  height: 3rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;
