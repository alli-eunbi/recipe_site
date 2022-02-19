import React, { ChangeEvent, ChangeEventHandler, useCallback } from 'react';
import styled from 'styled-components';

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar: React.FC<Props> = ({ onChange, ...rest }) => {
  const handleChangeSearchInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <SearchBarInput
      type='text'
      onChange={handleChangeSearchInput}
      placeholder='레시피 재료를 입력하세요.'
      {...rest}
    />
  );
};

export default SearchBar;

const SearchBarInput = styled.input`
  width: 23rem;
  height: 2rem;
  border-radius: 4px;
  border: 1px soild;
  text-align: center;
`;
