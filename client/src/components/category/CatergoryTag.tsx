import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

type CheckedObjType = {
  method: string;
  occ: string;
  kind: string;
};

type CatProps = {
  cat: string;
  checkedVal: CheckedObjType;
  onSetChecked: Dispatch<SetStateAction<CheckedObjType>>;
  data: any[];
};

type StyleProps = {
  checked?: boolean;
};

const CategoryTag: React.FC<CatProps> = (props) => {
  const { checkedVal, onSetChecked, data, cat } = props;

  const handleSelectOpt = (e: any) => {
    console.log(e.target);
  };

  return (
    <>
      <TagContainer onClick={handleSelectOpt}>
        {data.map((item) => (
          <TagLabel key={item.id} htmlFor={cat} onClick={handleSelectOpt}>
            <CheckButton type='radio' />
            {item.name}
          </TagLabel>
        ))}
      </TagContainer>
    </>
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
`;

// ${({ checked }: StyleProps) =>
//   checked &&
//   css`
//     background-color: #89c53f;
//     color: black;
//     border: none;
//   `}

const CheckButton = styled.input`
  display: none;
`;
