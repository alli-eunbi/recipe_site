import styled from 'styled-components';
import Button from '../ui/button/Button';
import SearchBar from '../../components/search/SearchBar';
import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentPageState,
  recipesState,
  ingredientsState,
  recipeCountState,
  lastPageState,
} from '../../store/store';
import { useQuery } from 'react-query';
import { fetchWordSearchResult } from '../../api/recipes';

const SearchForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [lastPage, setLastPage] = useRecoilState(lastPageState);
  const [ingredient, setIngredient] = useRecoilState<any>(ingredientsState);
  const setRecipeCount = useSetRecoilState(recipeCountState);
  const [searchResult, setSearchResult] =
    useRecoilState<string[]>(recipesState);

  const { data, status, refetch } = useQuery(
    'search-by-word',
    () => fetchWordSearchResult(ingredient, currentPage),
    { enabled: false }
  );

  useEffect(() => {
    if (status === 'success') {
      if (data?.data.length === 0) {
        setSearchResult([]);
      }
      setSearchResult(data?.data.recipes);
      setRecipeCount(data?.data.all_recipe_count);
      setLastPage(data?.data.all_page_count);
    }
  }, [data?.data.recipes]);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    setIngredient([e.target.value]);
  };

  const handleLoadSearchResult: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  return (
    <SearchFormWrapper action='submit' onSubmit={handleLoadSearchResult}>
      <SearchTitle>조건별 검색</SearchTitle>
      <div>
        <SearchBar
          onChange={handleChangeInput}
          placeholder='레시피 재료를 입력하세요.'
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
