import styled, { css } from 'styled-components';
import React, { useState, useEffect, Suspense } from 'react';
import { RecipesLayout } from '../../layout/RecipesLayout';
import { HighLight } from '../../text/Highlight';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import {
  ingredientsState,
  recipesState,
  filterAtom,
} from '../../../store/store';
import RecipeCard from '../RecipeCard';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import NoneFound from '../../ui/animation/NoneFound';
import { useQuery } from 'react-query';
import { fetchImageSearchResult } from '../../../api/recipes';
import {
  SpinnerContainer,
  SpinnerOverlay,
} from '../../ui/animation/LoadingSpinnerSmall';

type Props = {
  cardNum?: string[];
  recipes?: string[];
  loading?: boolean;
  fetched?: boolean;
  option?: {
    kind: string;
    method: string;
    occ: string;
  };
};

const ImageSearchRecipeList: React.FC<Props> = ({ option }) => {
  const [target, setTarget] = useState<HTMLDivElement | null>();
  const [currentPage, setCurrentPage] = useState(0);
  const [postPerPage, setPostPerPage] = useState(32);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useRecoilState(recipesState);
  const resetSearchData = useResetRecoilState(recipesState);

  const ingredients = useRecoilValue(ingredientsState);

  const {
    data: resultRecipe,
    isFetched,
    status,
    refetch,
  } = useQuery(
    'image-search-recipe',
    () => fetchImageSearchResult(ingredients.join('+'), currentPage),
    {
      enabled: false,
      cacheTime: 5000,
    }
  );

  const navigate = useNavigate();

  /* 게시물 로딩 threshold 넘기는 지 비동기 적으로 확인 (entry: 스크롤이 교차, observer: 지켜볼 옵저버)
  교차 시, 페이지를 넘긴다. 다음 threshold 타겟을 감시*/
  const onIntersect = async ([entry]: any, observer: any): Promise<any> => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      setIsLoading(true);
      setCurrentPage((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await refetch();
      setIsLoading(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    if (status === 'success') {
      if (currentPage <= 1) {
        setSearchData(resultRecipe?.data.recipes);
      } else {
        setSearchData([...searchData, resultRecipe?.data.recipes].flat());
      }
    }
  }, [resultRecipe?.data]);

  /* observer를 설정, 페이지를 나누는 타겟이 설정되면 지켜본다. target이 변경될 때마다 실행 */
  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1.0,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const filteredRecipes = searchData
    ? searchData?.filter((recipe: any) => {
        if (option?.kind === '페스코') {
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

  useEffect(() => {
    resetSearchData();
  }, []);

  // if (isError) {
  //   return (
  //     <RecipesLayout>
  //       <Button className='submit' onClick={() => navigate('/word-search')}>
  //         직접 검색으로 찾기
  //       </Button>
  //       <NoneFound>
  //         <h3>해당 조건으로 보여줄 레시피가 없군요...</h3>
  //       </NoneFound>
  //     </RecipesLayout>
  //   );
  // }

  return (
    <>
      {!isFetched && !isLoading && (
        <>
          <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>
          <hr />
        </>
      )}
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
            <FoundHeader>
              <h2>
                총 <HighLight>{resultRecipe?.data.all_page_count}</HighLight>
                건의 레시피를 찾았습니다!
              </h2>
              <Button
                className='submit'
                onClick={() => navigate('/word-search')}
              >
                직접 검색으로 찾기
              </Button>
            </FoundHeader>
            <hr />
          </>
        )}
        {!filteredRecipes && !isLoading && (
          <NoneFound>
            <p>해당 조건에는 보여줄 레시피가 없군요...</p>
          </NoneFound>
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
      </RecipesLayout>
      <div ref={setTarget}></div>
    </>
  );
};

export default ImageSearchRecipeList;

const FoundHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  text-align: center;
  height: fit-content;
`;

const RecipeListContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
