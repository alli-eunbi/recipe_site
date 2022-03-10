import styled from 'styled-components';
import ImageSearchRecipeList from '../recipes/list/ImageSearchRecipeList';
import Category from './Category';
import SearchForm from './SearchForm';
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { filterAtom, recipesState } from '../../store/store';
import WordSearchRecipeList from '../recipes/list/WordSearchRecipeList';

type Props = {
  mode: string;
};

const SearchControl: React.FC<Props> = ({ mode }) => {
  // const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] =
    useRecoilState<string[]>(recipesState);
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
    [option.kind, option.method, option.occ]
  );

  return (
    <div>
      {mode === 'word' && (
        <>
          <PanelContainer>
            <SearchForm />
            <hr />
            <Category option={option} onSetOption={handleSelectOpt} />
          </PanelContainer>
          <WordSearchRecipeList />
        </>
      )}
      {mode === 'image' && (
        <ImageSearchContainer>
          <PanelContainer>
            <Category option={option} onSetOption={handleSelectOpt} />
          </PanelContainer>
          <ImageSearchRecipeList recipes={searchResult} option={option} />
        </ImageSearchContainer>
      )}
    </div>
  );
};

export default SearchControl;

const ImageSearchContainer = styled.div`
  margin-top: 10rem;
`;

const PanelContainer = styled.div`
  margin: 8rem auto 0;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  width: fit-content;
`;
