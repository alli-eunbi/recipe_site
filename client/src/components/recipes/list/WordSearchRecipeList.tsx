import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { RecipesLayout } from '../../layout/RecipesLayout';
import { HighLight } from '../../text/Highlight';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import {
  filterState,
  pageState,
  recipeCountState,
  recipesState,
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

  const [currentPage, setCurrentPage] = useRecoilState(pageState);
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

  useEffect(() => {
    if (status === 'success') {
      setRecipeCount(resultRecipe?.data.all_recipe_count);
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

  const onIntersect = async ([entry]: any, observer: any): Promise<any> => {
    if (resultRecipe?.data.length === 0) {
      return;
    }
    if (entry.isIntersecting && !isLoadingMore) {
      observer.unobserve(entry.target);
      setIsLoadingMore(true);
      await refetch();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentPage((prev) => prev + 1);
      setIsLoadingMore(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: any;
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

  /* ??? ?????????, ?????? ?????? */
  useEffect(() => {
    resetSearchData();
    resetFilterData();
    setCurrentPage(1);
  }, []);

  const filteredRecipes =
    searchData !== undefined
      ? searchData?.filter((recipe: any) => {
          if (option.kind === '?????????') {
            return (
              recipe.kind === '?????????' ||
              recipe.kind === '??????' ||
              recipe.kind === '??????' ||
              recipe.kind === '??????' ||
              recipe.kind === '??????/??????'
            );
          }
          if (option?.kind === '????????????') {
            return (
              recipe.kind === '??????' ||
              recipe.kind === '??????' ||
              recipe.kind === '??????/??????'
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
              <h2>???????????? ?????? ????????????...</h2>
              <LoadingSpinner />
            </LoadingContainer>
          </>
        )}
        {filteredRecipes !== undefined && (
          <>
            {filteredRecipes.length > 0 && !isLoadingMore && (
              <>
                <h2>
                  ??? <HighLight>{recipeCount}</HighLight>
                  ?????? ???????????? ???????????????!
                </h2>
                <hr />
              </>
            )}
            {filteredRecipes.length === 0 && !isLoadingRecipe && (
              <NoneFound>
                <p>?????? ???????????? ????????? ???????????? ?????????...</p>
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
        <div style={{ textAlign: 'center' }} ref={setTarget}></div>
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
