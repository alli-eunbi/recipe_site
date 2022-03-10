import styled from 'styled-components';
import Button from '../ui/button/Button';
import SearchBar from '../../components/search/SearchBar';
import {
  ChangeEventHandler,
  FormEventHandler,
  Dispatch,
  useRef,
  useEffect,
} from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { pageState, recipesState, ingredientsState } from '../../store/store';
import { useQuery } from 'react-query';
import { fetchSearchResult } from '../../api/recipes';

const SearchForm: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const [ingredient, setIngredient] = useRecoilState<any>(ingredientsState);
  const [searchResult, setSearchResult] =
    useRecoilState<string[]>(recipesState);

  const handleLoadSearchResult: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchResult(data?.data);
    const element = searchInputRef.current as HTMLInputElement;
    element.focus();
  };

  const { data, isFetched } = useQuery('search-by-word', () =>
    fetchSearchResult(ingredient, currentPage)
  );

  // useEffect(() => {
  //   if (isFetched) {
  //     setSearchResult([data?.data]);
  //   }
  // }, [data?.data]);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    setIngredient([e.target.value]);
  };

  return (
    <SearchFormWrapper action='submit' onSubmit={handleLoadSearchResult}>
      <SearchTitle>조건별 검색</SearchTitle>
      <div>
        <SearchBar
          onChange={handleChangeInput}
          placeholder='레시피 재료를 입력하세요.'
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
