import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { KIND_DATA } from '../../assets/data/categoryData';
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
  return (
    <div>
      <form>
        <FilterWrapper>
          <span>필터</span>
          <IconOption data={KIND_DATA} />
        </FilterWrapper>
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
    font-size: 1.4rem;
    font-weight: bold;
  }
`;
