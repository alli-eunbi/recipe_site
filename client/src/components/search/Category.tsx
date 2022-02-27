import React, {
  useState,
  useCallback,
  ChangeEvent,
  FormEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from 'react';
import styled from 'styled-components';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import CategoryOption from '../category/CategoryOption';

type Props = {
  option: {
    kind: string;
    method: string;
    occ: string;
  };
  onSetOption: Dispatch<SetStateAction<any>>;
};

const Category: React.FC<Props> = ({ option, onSetOption }) => {
  /* 스테이트는 부모컴포넌트에서 관리 */

  const handleSelectOpt = (value: any) => {
    onSetOption(value);
  };

  return (
    <div>
      <form>
        <CategoryOption
          data={KIND_DATA}
          onChange={handleSelectOpt}
          option={option.kind}
        >
          종류별
        </CategoryOption>
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
      </form>
    </div>
  );
};

export default Category;
