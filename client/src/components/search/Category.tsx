import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import CategoryOption from '../category/CategoryOption';
import IconOption from '../category/IconOption';

type Props = {
  option: {
    kind: string;
    method: string;
    occ: string;
  };
  onSetOption: Dispatch<
    SetStateAction<{ kind: string; method: string; occ: string }>
  >;
};

const Category: React.FC<Props> = ({ option, onSetOption }) => {
  const handleSelectOpt = (value: any) => {
    onSetOption(value);
  };

  return (
    <div>
      <form>
        {/* <CategoryOption
          data={KIND_DATA}
          onChange={handleSelectOpt}
          option={option.kind}
        >
          종류별
        </CategoryOption> */}
        <FilterWrapper>
          <span>필터</span>
          <IconOption data={KIND_DATA} />
        </FilterWrapper>
        {/* <CategoryOption
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
        </CategoryOption> */}
      </form>
    </div>
  );
};

export default Category;

const FilterWrapper = styled.div`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
