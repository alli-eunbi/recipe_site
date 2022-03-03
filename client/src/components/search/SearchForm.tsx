import styled from 'styled-components';
import Button from '../ui/button/Button';
import SearchBar from '../../components/search/SearchBar';
import { ChangeEventHandler, FormEventHandler, Dispatch } from 'react';

type Props = {
  searchInput: string;
  onChange: Dispatch<React.SetStateAction<string>>;
  onClick: any;
};

const SearchForm: React.FC<Props> = ({ searchInput, onChange, onClick }) => {
  const handleLoadHandleResult: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onClick();
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <SearchFormWrapper action='submit' onSubmit={handleLoadHandleResult}>
      <SearchTitle>조건별 검색</SearchTitle>
      <div>
        <SearchBar
          onChange={handleChangeInput}
          placeholder='레시피 재료를 입력하세요.'
          value={searchInput}
        />
        <Button className='search'>검색</Button>
      </div>
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
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;

  > div {
    display: flex;
  }
`;
