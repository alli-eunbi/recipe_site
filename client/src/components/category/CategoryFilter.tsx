import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import CategoryTag from './CatergoryTag';
import { METHOD_DATA } from '../../assets/data/mockData';
import { OCC_DATA } from '../../assets/data/mockData';
import { KIND_DATA } from '../../assets/data/mockData';

const CategoryFilter: React.FC = () => {
  const [checked, setChecked] = useState({ method: '', occ: '', kind: '' });

  return (
    <>
      <FilterContainer>
        <CategoryTitle>조건별 검색</CategoryTitle>
        <form>
          <OptionsContainer>
            <OptionName>방법별 </OptionName>
            <CategoryTag
              cat='방법별'
              onSetChecked={setChecked}
              checkedVal={checked}
              data={METHOD_DATA}
            />
          </OptionsContainer>
          <OptionsContainer>
            <OptionName>상황별 </OptionName>
            <CategoryTag
              cat='상황별'
              onSetChecked={setChecked}
              checkedVal={checked}
              data={OCC_DATA}
            />
          </OptionsContainer>
          <OptionsContainer>
            <OptionName>종류별 </OptionName>
            <CategoryTag
              cat='종류별'
              onSetChecked={setChecked}
              checkedVal={checked}
              data={KIND_DATA}
            />
          </OptionsContainer>
        </form>
      </FilterContainer>
    </>
  );
};

export default CategoryFilter;

const FilterContainer = styled.div`
  margin: 8rem auto 0;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  width: fit-content;
`;

const CategoryTitle = styled.h2`
  text-align: center;
  color: black;
`;

const OptionsContainer = styled.div`
  display: flex;
  margin: 1.5rem 0 0 1rem;
`;

const OptionName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  word-wrap: keep-all;
  width: 90px;
  color: black;
`;
