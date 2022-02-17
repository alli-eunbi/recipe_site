import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import CategoryTag from './CatergoryTag';
import { METHOD_DATA } from '../../assets/data/mockData';
import { OCC_DATA } from '../../assets/data/mockData';
import { KIND_DATA } from '../../assets/data/mockData';

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
          <OptionsContainer>
            <OptionName>방법별 </OptionName>
            {METHOD_DATA.map((item) => (
              <CategoryTag
                key={item.id}
                id={item.id}
                cat={item.cat}
                name={item.name}
                onChange={handleSelectOpt}
                option={option.method}
              />
            ))}
          </OptionsContainer>
          <OptionsContainer>
            <OptionName>상황별 </OptionName>
            {OCC_DATA.map((item) => (
              <CategoryTag
                key={item.id}
                id={item.id}
                cat={item.cat}
                name={item.name}
                onChange={handleSelectOpt}
                option={option.occ}
              />
            ))}
          </OptionsContainer>
          <OptionsContainer>
            <OptionName>종류별 </OptionName>
            {KIND_DATA.map((item) => (
              <CategoryTag
                key={item.id}
                id={item.id}
                cat={item.cat}
                name={item.name}
                onChange={handleSelectOpt}
                option={option.kind}
              />
            ))}
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
  margin-bottom: 1rem;
  text-align: center;
  color: black;
`;

const OptionsContainer = styled.div`
  display: flex;
  margin: 1.5rem 0 0 1rem;
  @media (max-width: 1200px) {
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
