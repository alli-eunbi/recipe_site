import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import CategoryOption from './CategoryOption';

const CategoryFilter: React.FC = () => {
  /* 스테이트는 부모컴포넌트에서 관리 */
  const [option, setOption] = useState({
    method: '전체',
    occ: '전체',
    kind: '전체',
  });

  const handleSelectOpt = useCallback(
    (value) => {
      const tagType = value.target.name;
      const tagName = value.target.id.slice(1, value.target.id.length);

      setOption({
        ...option,
        [tagType]: tagName,
      });
    },
    [option]
  );

  useEffect(() => {
    console.log(option);
  }, [option]);

  return (
    <>
      <FilterContainer>
        <CategoryTitle>조건별 검색</CategoryTitle>
        <hr />
        <form>
          <CategoryOption
            data={METHOD_DATA}
            onChange={handleSelectOpt}
            option={option.method}
          >
            방법별
          </CategoryOption>
          <CategoryOption
            data={OCC_DATA}
            onChange={handleSelectOpt}
            option={option.occ}
          >
            상황별
          </CategoryOption>
          <CategoryOption
            data={KIND_DATA}
            onChange={handleSelectOpt}
            option={option.kind}
          >
            종류별
          </CategoryOption>
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
  margin-bottom: 1rem;
  text-align: center;
  color: black;
`;

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
