import styled, { css } from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import { RecipesLayout } from '../../layout/RecipesLayout';
import { HighLight } from '../../text/Highlight';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import {
  filterState,
  currentPageState,
  recipeCountState,
  recipesState,
  lastPageState,
} from '../../../store/store';
import NoneFound from '../../ui/animation/NoneFound';
import { useQuery } from 'react-query';
import RecipeCard from './RecipeCard';
import { ingredientsState } from '../../../store/store';
import { fetchWordSearchResult } from '../../../api/recipes';
import {
  SpinnerContainer,
  SpinnerOverlay,
} from '../../ui/animation/LoadingSpinnerSmall';
import ScrollTopButton from '../../ui/button/ScrollTopButton';

const WordSearchRecipeList: React.FC = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [lastPage, setLastPage] = useRecoilState(lastPageState);
  const [searchData, setSearchData] = useRecoilState(recipesState);
  const [recipeCount, setRecipeCount] = useRecoilState(recipeCountState);
  const resetFilterData = useResetRecoilState(filterState);
  const resetSearchData = useResetRecoilState(recipesState);
  const option = useRecoilValue(filterState);

  const ingredients = useRecoilValue(ingredientsState);

  const {
    data: resultRecipe,
    isLoading: isLoadingRecipe,
    status,
    refetch,
  } = useQuery(
    'search-recipe',
    () => fetchWordSearchResult(ingredients.join('+'), currentPage),
    { cacheTime: 0 }
  );

  const fetchRecipeData = async () => {
    setCurrentPage((prev) => prev + 1);
    await refetch();
  };

  const onIntersect = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ): Promise<any> => {
      if (resultRecipe?.data.length === 0) {
        return;
      }

      if (entry.isIntersecting && !isLoadingMore) {
        observer.unobserve(entry.target);
        setIsLoadingMore(true);
        await fetchRecipeData();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoadingMore(false);
        observer.observe(entry.target);
      }
    },
    [searchData]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => {
      observer && observer.disconnect();
      setIsLoadingMore(false);
    };
  }, [target]);

  /* 재 방문시, 필터 리셋 */
  useEffect(() => {
    resetSearchData();
    resetFilterData();
    setCurrentPage(1);
    setLastPage(Number.MAX_SAFE_INTEGER);
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setRecipeCount(resultRecipe?.data.all_recipe_count);
      setLastPage(resultRecipe?.data.all_page_count);
      if (currentPage <= 1) {
        setSearchData(resultRecipe?.data.recipes);
      }
      if (currentPage > 1) {
        setSearchData([...searchData, resultRecipe?.data.recipes].flat());
      }
      if (resultRecipe?.data.length === 0) {
        setSearchData([]);
      }
    }
  }, [resultRecipe?.data.recipes]);

  const filteredRecipes =
    searchData !== undefined
      ? searchData?.filter((recipe: any) => {
          if (option.kind === '페스코') {
            return (
              recipe.kind === '페스코' ||
              recipe.kind === '락토' ||
              recipe.kind === '오보' ||
              recipe.kind === '비건' ||
              recipe.kind === '락토/오보'
            );
          }
          if (option?.kind === '락토오보') {
            return (
              recipe.kind === '락토' ||
              recipe.kind === '오보' ||
              recipe.kind === '락토/오보'
            );
          }
          return recipe.kind === option?.kind;
        })
      : [];

  return (
    <>
      <RecipesLayout>
        {isLoadingRecipe && (
          <>
            <LoadingContainer>
              <h2>레시피를 찾는 중입니다...</h2>
              <LoadingSpinner />
            </LoadingContainer>
          </>
        )}
        {filteredRecipes !== undefined && (
          <>
            {filteredRecipes.length > 0 && !isLoadingMore && (
              <>
                <h2>
                  총 <HighLight>{recipeCount}</HighLight>
                  건의 레시피를 찾았습니다!
                </h2>
                <hr />
              </>
            )}
            {filteredRecipes.length === 0 && !isLoadingRecipe && (
              <NoneFound>
                <p>해당 조건에는 보여줄 레시피가 없군요...</p>
              </NoneFound>
            )}
          </>
        )}
        <RecipeListContainer>
          {filteredRecipes &&
            filteredRecipes.map((recipe: any, idx: number) => (
              <RecipeCard
                key={`${recipe.recipe_id}+${idx}`}
                id={recipe.recipe_id}
                image={recipe.main_image}
                title={recipe.name}
                rating={recipe.mean_rating}
                kind={recipe.kind}
              />
            ))}
        </RecipeListContainer>
        <ScrollTopButton />
        {filteredRecipes !== undefined && (
          <>
            {isLoadingMore && filteredRecipes.length > 0 && (
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
            )}
          </>
        )}
        {currentPage < lastPage && <div ref={setTarget} />}
      </RecipesLayout>
    </>
  );
};

export default WordSearchRecipeList;

const LoadingContainer = styled.div`
  text-align: center;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem 2rem;
`;

const RecipeListContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 1rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  width: 80vw;
  height: 40vh;
  transition: 100ms ease-out;

  ${(recipes) =>
    recipes &&
    css`
      width: fit-content;
      height: fit-content;
    `}

  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 970px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
