import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

type CatProps = {
  id: string;
  option: string;
  checkedVal: string;
  onSetChecked: Dispatch<SetStateAction<string>>;
};

type StyleProps = {
  checked?: boolean;
};

const CategoryTag: React.FC<CatProps> = (props) => {
  const { checkedVal, onSetChecked, option, id } = props;

  const handleSelect = useCallback(
    (e: any) => {
      onSetChecked(e.target.id);
    },
    [checkedVal]
  );
  console.log(checkedVal);
  console.log(option);

  return (
    <TagContainer>
      <TagLabel
        htmlFor={id}
        onClick={handleSelect}
        checked={checkedVal === option}
      >
        {props.option}
        <CheckButton type='checkbox' id={id} />
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
