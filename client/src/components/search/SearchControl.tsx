import styled from 'styled-components';
import RecipeList from '../recipes/RecipeList';
import Category from './Category';
import SearchForm from './SearchForm';
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchWordSearchResult } from '../../api/recipes';

const SearchControl: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');

  const [option, setOption] = useState({
    kind: '페스코',
    method: '전체',
    occ: '전체',
  });

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

  const { data, isFetched, isLoading, refetch } = useQuery(
    'search-by-word',
    () => fetchWordSearchResult(searchInput),
    {
      enabled: false,
    }
  );
  if (isFetched) {
    console.log(data?.data);
  }

  return (
    <div>
      <PanelContainer>
        <SearchForm
          onClick={refetch}
          searchInput={searchInput}
          onChange={setSearchInput}
        />
        <hr />
        {data?.data && (
          <Category option={option} onSetOption={handleSelectOpt} />
        )}
      </PanelContainer>
      <RecipeList recipes={data?.data} option={option} loading={isLoading} />
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
