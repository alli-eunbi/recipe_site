import React from 'react';
import styled from 'styled-components';
import KindIcon from './Icon';
import { filterAtom } from '../../store/store';
import { useRecoilState } from 'recoil';

type DataType = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  data: DataType[];
  className?: string;
};

const IconOption: React.FC<Props> = React.forwardRef(
  ({ data, children, className }, ref) => {
    const [filter, setFilter] = useRecoilState(filterAtom);

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
              <KindIcon
                key={item.id}
                name={item.name}
                onSelectOption={handleFilter}
                image={`images/${item.id}.png`}
                alt={item.id}
              />
            </KindIconWrapper>
            <p>{item.description}</p>
          </div>
        ))}
      </KindOptionContainer>
    );
  }
);

export default IconOption;

const KindOptionContainer = styled.div`
  &.image-submit {
    margin: 2rem 0 auto;
  }

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
