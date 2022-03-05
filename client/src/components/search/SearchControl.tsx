import styled from 'styled-components';
import RecipeList from '../recipes/RecipeList';
import Category from './Category';
import SearchForm from './SearchForm';
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchWordSearchResult } from '../../api/recipes';
import { useRecoilState } from 'recoil';
import { filterAtom, searchAtom } from '../../store/store';
import WordSearchRecipeList from '../recipes/WordSearchRecipeList';

type Props = {
  mode: string;
};

const SearchControl: React.FC<Props> = ({ mode }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useRecoilState(searchAtom);

  const [option, setOption] = useRecoilState(filterAtom);

  const handleSelectOpt = useCallback(
    (value) => {
      const tagType = value.target.name;
      const tagName = value.target.id.slice(1, value.target.id.length);

      setOption({
        ...option,
        [tagType]: tagName,
      });
    },
    [option]
  );

  const {
    data,
    isLoading,
    isFetched,
    isFetching,
    refetch: searchWord,
  } = useQuery('search-by-word', () => fetchWordSearchResult(searchInput), {
    enabled: false,
  });

  const handleSearchRecipe = () => {
    searchWord();
    if (isFetched) {
      setSearchResult({
        ...searchResult,
        ['recipes']: data?.data,
      });
    }
  };

  return (
    <div>
      {mode === 'word' && (
        <>
          <PanelContainer>
            <SearchForm
              onClick={handleSearchRecipe}
              searchInput={searchInput}
              onChange={setSearchInput}
            />
            <hr />
            {isFetched && (
              <Category option={option} onSetOption={handleSelectOpt} />
            )}
          </PanelContainer>
          <WordSearchRecipeList
            recipes={data?.data}
            option={option}
            loading={isLoading}
            fetched={isFetched}
          />
        </>
      )}
      {mode === 'image' && (
        <div style={{ marginTop: '10rem' }}>
          <PanelContainer>
            <Category option={option} onSetOption={handleSelectOpt} />
          </PanelContainer>
          <RecipeList
            recipes={searchResult}
            option={option}
            loading={isLoading}
            fetched={isFetched}
          />
        </div>
      )}
    </div>
  );
};

export default SearchControl;

const PanelContainer = styled.div`
  margin: 8rem auto 0;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  width: fit-content;
`;
