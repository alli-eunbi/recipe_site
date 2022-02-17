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
    if (e.target.id === '방법별') {
      onSetChecked((checked) => (checked['method'] = e.target.textContent));
    }
    if (e.target.id === '상황별') {
      onSetChecked((checked) => (checked['occ'] = e.target.textContent));
    }
    if (e.target.id === '종류별') {
      onSetChecked((checked) => (checked['kind'] = e.target.textContent));
    }
    console.log(checkedVal);
  };

  return (
    <>
      <TagContainer>
        {data.map((item) => (
          <TagLabel
            key={item.id}
            id={cat}
            htmlFor={cat}
            onClick={handleSelectOpt}
          >
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

const CheckButton = styled.input``;
