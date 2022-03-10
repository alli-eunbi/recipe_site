import styled, { css } from 'styled-components';
import React, { useState, useEffect, Suspense } from 'react';
import { RecipesLayout } from '../../layout/RecipesLayout';
import { HighLight } from '../../text/Highlight';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, pageState, recipesState } from '../../../store/store';
import NoneFound from '../../ui/animation/NoneFound';
import { useQuery } from 'react-query';
import RecipeCard from '../RecipeCard';
import { ingredientsState } from '../../../store/store';
import { fetchWordSearchResult } from '../../../api/recipes';
import { recipeData } from '../../../assets/data/mockRecipeData';
import {
  SpinnerContainer,
  SpinnerOverlay,
} from '../../ui/animation/LoadingSpinnerSmall';

type Props = {
  cardNum?: string[];
  recipes?: string[];
};

const WordSearchRecipeList: React.FC<Props> = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>();
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  // const [postPerPage, setPostPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useRecoilState(recipesState);
  const resetData = useResetRecoilState(filterAtom);
  const option = useRecoilValue(filterAtom);

  const ingredients = useRecoilValue(ingredientsState);

  // const lastIdx = currentPage * postPerPage;

  const {
    data: resultRecipe,
    status,
    refetch,
  } = useQuery(
    'search-recipe',
    () => fetchWordSearchResult(ingredients.join('+'), currentPage),
    { enabled: false }
  );

  console.log(currentPage);

  useEffect(() => {
    if (status === 'success') {
      if (currentPage <= 1) {
        setSearchData(resultRecipe?.data);
      } else {
        setSearchData([...searchData, resultRecipe?.data].flat());
      }
    }
  }, [resultRecipe?.data]);

  /* 게시물 로딩 threshold 넘기는 지 비동기 적으로 확인 (entry: 스크롤이 교차, observer: 지켜볼 옵저버)
  교차 시, 페이지를 넘긴다. 다음 threshold 타겟을 감시*/
  const onIntersect = async ([entry]: any, observer: any): Promise<any> => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentPage((prev) => prev + 1);
      await refetch();
      setIsLoading(false);
      observer.observe(entry.target);
    }
  };

  /* observer를 설정, 페이지를 나누는 타겟이 설정되면 지켜본다. target이 변경될 때마다 실행 */
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
      setIsLoading(false);
    };
  }, [target]);

  /* 재 방문시, 필터 리셋 */
  useEffect(() => {
    resetData();
  }, []);

  const filteredRecipes = searchData?.filter((recipe: any) => {
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
  });

  return (
    <>
      <RecipesLayout>
        {isLoading && (
          <>
            <LoadingContainer>
              <h2>레시피를 찾는 중입니다...</h2>
              <LoadingSpinner />
            </LoadingContainer>
          </>
        )}
        {filteredRecipes && !isLoading && (
          <>
            <h2>
              총 <HighLight>{filteredRecipes.length}</HighLight>건의 레시피를
              찾았습니다!
            </h2>
            <hr />
          </>
        )}
        <RecipeListContainer>
          {filteredRecipes &&
            filteredRecipes.map((recipe: any) => (
              <RecipeCard
                key={recipe.recipe_id}
                id={recipe.recipe_id}
                image={recipe.main_image}
                title={recipe.name}
                rating={recipe.mean_rating}
                kind={recipe.kind}
              />
            ))}
        </RecipeListContainer>
        {isLoading && (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
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
