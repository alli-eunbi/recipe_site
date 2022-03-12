import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import { filterState } from '../../store/store';
import { useRecoilState } from 'recoil';
import { kindMapper } from '../../assets/data/kindMapper';

type DataType = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  data: DataType[];
  className?: string;
};

const IconOption: React.FC<Props> = ({ data, className }) => {
  const [filter, setFilter] = useRecoilState(filterState);

  const handleFilter = (value: string) => {
    setFilter({
      ...filter,
      ['kind']: value,
    });
  };

  return (
    <KindOptionContainer className={className}>
      {data.map((item) => (
        <div key={item.id}>
          <KindIconWrapper>
            <Icon
              key={item.id}
              name={item.name}
              option={filter.kind}
              onSelectOption={handleFilter}
              image={`images/option/${item.id}.png`}
              alt={item.id}
            />
          </KindIconWrapper>
          <p>{item.description}</p>
        </div>
      ))}
    </KindOptionContainer>
  );
};

export default IconOption;

const KindOptionContainer = styled.div`
  &.image-submit {
    margin: 2rem 0 auto;
  }

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    > div {
      margin-bottom: 1rem;
    }

    > div > p {
      width: 8rem;
      height: fit-content;
      line-height: 1.5rem;
    }
  }
`;

const KindIconWrapper = styled.div`
  :hover {
    & + p {
      position: absolute;
      display: block;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    }
  }
  & + p {
    font-size: 15px;
    text-align: center;
    border-radius: 4px;
    margin-left: 1rem;
    display: none;
    width: 20rem;
    height: 3rem;
    line-hight: 3px;
    word-break: keep-all;
  }
`;
