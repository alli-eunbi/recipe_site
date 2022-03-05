import React, { Dispatch, SetStateAction } from 'react';
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>종류</span>
          <IconOption data={KIND_DATA} />
        </div>
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
