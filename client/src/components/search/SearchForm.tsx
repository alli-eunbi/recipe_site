import styled from 'styled-components';
import Button from '../button/Button';
import SearchBar from '../../components/search/SearchBar';
import { useState, ChangeEventHandler, FormEventHandler } from 'react';

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleLoadHandleResult: FormEventHandler<HTMLFormElement> = (e) => {
    setSearchInput(e.currentTarget.value);
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <SearchFormWrapper action='submit' onSubmit={handleLoadHandleResult}>
      <SearchTitle>조건별 검색</SearchTitle>
      <SearchBar
        onChange={handleChangeInput}
        placeholder='레시피 재료를 입력하세요.'
        value={searchInput}
      />
      <Button>검색</Button>
    </SearchFormWrapper>
  );
};

export default SearchForm;

const SearchTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: black;
`;

const SearchFormWrapper = styled.form`

  align-items: center;
  margin-bottom: 1rem,
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8rem auto 0;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;
