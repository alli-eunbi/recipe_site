import React, { ChangeEventHandler, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

type CatProps = {
  key: string;
  cat: string;
  name: string;
  onChange: ChangeEventHandler<HTMLLabelElement>;
  option: string;
};

type StyleProps = {
  checked?: boolean;
};

const CategoryTag: React.FC<CatProps> = (props) => {
  const { key, cat, name, onChange, option } = props;

  const handleClick = (e: any) => {
    onChange(e);
    console.log(option);
  };

  return (
    <TagContainer>
      <TagLabel key={key} htmlFor={cat[0] + name} checked={option === name}>
        {name}
        <CheckButton
          type='radio'
          name={cat}
          id={cat[0] + name}
          onClick={handleClick}
        />
      </TagLabel>
    </TagContainer>
  );
};

export default CategoryTag;

const TagContainer = styled.div``;

const TagLabel = styled.label`
  color: white;
  text-align: center;
  font-size: 0.9rem;
  margin: 2px;
  padding: 5px 10px;
  width: fit-content;
  border-radius: 4px;
  background-color: green;
  transition: 150ms ease;
  cursor: pointer;
  ${({ checked }: StyleProps) =>
    checked &&
    css`
      background-color: #89c53f;
      color: black;
      border: none;
    `}
`;

const CheckButton = styled.input`
  display: none;
`;
