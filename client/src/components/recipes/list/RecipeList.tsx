import styled, { css } from 'styled-components';
import React, { useState, useEffect, Suspense } from 'react';
import { RecipesLayout } from '../../layout/RecipesLayout';
import { HighLight } from '../../text/Highlight';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';
import { useRecoilValue, useRecoilStateLoadable } from 'recoil';
import { ingredientsState, recipesState } from '../../../store/store';
// import RecipeCard from './RecipeCard';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import NoneFound from '../../ui/animation/NoneFound';
import { useQuery } from 'react-query';
import { fetchImageSearchResult } from '../../../api/recipes';

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

const RecipeList: React.FC<Props> = ({ option, loading, fetched }) => {
  const [target, setTarget] = useState<HTMLDivElement | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(32);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useRecoilStateLoadable(recipesState);
  // const searchData = useRecoilValue(recipesState);

  const ingredients = useRecoilValue(ingredientsState);

  const lastIdx = currentPage * postPerPage;

  /* 마지막 페이지에 따라 게시물의 수를 변경 */
  const limitNumOfItems = (items: string[]) => {
    let currentItems;
    currentItems = items.slice(0, lastIdx);
    return currentItems;
  };

  const {
    data: resultRecipe,
    isLoading: isLoadingRecipe,
    isFetched,
  } = useQuery('image-search-recipe', () =>
    fetchImageSearchResult(ingredients.join('+'))
  );

  const navigate = useNavigate();

  /* 페이지 넘기는 비동기 함수, 프로미스 응답 성공시,
   1500밀리 초 뒤 페이지를 넘긴다. 로딩 상태를 false로 전환*/
  const flipPage = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentPage((prev) => prev + 1);
    setIsLoading(false);
  };

  /* 게시물 로딩 threshold 넘기는 지 비동기 적으로 확인 (entry: 스크롤이 교차, observer: 지켜볼 옵저버)
  교차 시, 페이지를 넘긴다. 다음 threshold 타겟을 감시*/
  const onIntersect = async ([entry]: any, observer: any): Promise<any> => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await flipPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    setRecipes(resultRecipe?.data);
  }, [resultRecipe?.data]);

  /* observer를 설정, 페이지를 나누는 타겟이 설정되면 지켜본다. target이 변경될 때마다 실행 */
  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const RecipeCard = React.lazy(() => import('../RecipeCard'));

  const filteredRecipes = recipes.contents
    ? resultRecipe?.data.filter(
        (recipe: { kind: string; method: string; occ: string }) => {
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
        }
      )
    : [];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RecipesLayout>
        {isLoadingRecipe && (
          <LoadingSpinner>
            <h2>레시피를 찾는 중입니다.</h2>
          </LoadingSpinner>
        )}

        {filteredRecipes && !isLoadingRecipe && (
          <FoundHeader>
            <h2>
              총 <HighLight>{filteredRecipes.length}</HighLight>건의 레시피를
              찾았습니다!
            </h2>
            <Button className='submit' onClick={() => navigate('/word-search')}>
              직접 검색으로 찾기
            </Button>
          </FoundHeader>
        )}
        <hr />
        {!filteredRecipes && (
          <NoneFound>
            <p>해당 조건에는 보여줄 레시피가 없군요...</p>
          </NoneFound>
        )}
        <RecipeListContainer>
          {filteredRecipes &&
            limitNumOfItems(filteredRecipes).map((recipe: any) => (
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
      </RecipesLayout>
      <div ref={setTarget}></div>
    </Suspense>
  );
};

export default RecipeList;

const FoundHeader = styled.div`
  display: flex;
  justify-content: space-between;
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
