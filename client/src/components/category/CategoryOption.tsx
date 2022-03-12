import React, { ChangeEventHandler } from 'react';
import CategoryTag from './CatergoryTag';
import styled from 'styled-components';

type DataType = {
  cat: string;
  id: string;
  name: string;
};

type Props = {
  data: DataType[];
  onChange: ChangeEventHandler;
  option: string;
  style?: any;
};

const CategoryOption: React.FC<Props> = ({
  data,
  children,
  onChange,
  option,
}) => {
  return (
    <OptionsContainer>
      <OptionName>{children}</OptionName>
      {data.map((item) => (
        <CategoryTag
          key={item.id}
          id={item.id}
          cat={item.cat}
          name={item.name}
          onChange={onChange}
          option={option}
        />
      ))}
    </OptionsContainer>
  );
};

export default CategoryOption;

const OptionsContainer = styled.div`
  display: flex;
  margin: 1.5rem 0 0 1rem;
  @media (max-width: 1210px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    &:nth-child(1) {
      grid-row: 1;
      grid-column: 1;
    }
  }
`;

const OptionName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  word-wrap: keep-all;
  width: 50px;
  color: black;
`;
