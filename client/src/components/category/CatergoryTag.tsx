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
  defaultChecked?: boolean;
};

const CategoryTag: React.FC<CatProps> = (props) => {
  const { checkedVal, onSetChecked, option, id } = props;

  const handleSelect = useCallback(
    (e: any) => {
      onSetChecked(e.target.textContent);
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
        defaultChecked={checkedVal === option}
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
  transition: 200ms ease;
  cursor: pointer;
  ${({ defaultChecked }: StyleProps) =>
    defaultChecked &&
    css`
      background-color: yellow;
      color: grey;
      border: none;
    `}
`;

const CheckButton = styled.input`
  display: none;
`;
