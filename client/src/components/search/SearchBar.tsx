import React from 'react';
import styled from 'styled-components';

const SearchBar: React.FC = () => {
  return <SearchBarInput type='text' placeholder='레시피 재료를 입력하세요.' />;
};

export default SearchBar;

const SearchBarInput = styled.input`
  width: 23rem;
  height: 2rem;
  border-radius: 4px;
  border: 1px soild;
  margin: 0 auto;
`;
