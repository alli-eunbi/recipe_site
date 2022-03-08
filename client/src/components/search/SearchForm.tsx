import styled from 'styled-components';
import Button from '../ui/button/Button';
import SearchBar from '../../components/search/SearchBar';
import { ChangeEventHandler, FormEventHandler, Dispatch, useRef } from 'react';

type Props = {
  searchInput: string;
  onChange: Dispatch<React.SetStateAction<string>>;
  onClick: any;
};

const SearchForm: React.FC<Props> = ({ searchInput, onChange, onClick }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLoadSearchResult: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onClick();
    const element = searchInputRef.current as HTMLInputElement;
    element.focus();
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <SearchFormWrapper action='submit' onSubmit={handleLoadSearchResult}>
      <SearchTitle>조건별 검색</SearchTitle>
      <div>
        <SearchBar
          onChange={handleChangeInput}
          placeholder='레시피 재료를 입력하세요.'
          value={searchInput}
          ref={searchInputRef}
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

  @media (max-width: 490px) {
    width: 300px;

    > div {
      width: 80%;
    }
  }
`;
