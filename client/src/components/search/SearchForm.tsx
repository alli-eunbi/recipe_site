import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import SearchBar from './SearchBar';

const SearchForm = () => {
  return (
    <SearchFormWrapper action='submit'>
      <h2>재료명으로 검색하기</h2>
      {/* <SearchBar /> */}
      <Button>레시피 찾기</Button>
    </SearchFormWrapper>
  );
};

export default SearchForm;

const SearchFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 8rem auto 0;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;
