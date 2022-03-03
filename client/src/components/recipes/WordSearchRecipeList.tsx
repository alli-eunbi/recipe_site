import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { RecipesLayout } from '../layout/RecipesLayout';
import { HighLight } from '../text/Highlight';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useRecoilValue } from 'recoil';
import { searchAtom } from '../../store/store';
import RecipeCard from './RecipeCard';

type Props = {
  cardNum?: string[];
  recipes?: any;
  loading?: boolean;
  fetched?: boolean;
  option?: {
    kind: string;
    method: string;
    occ: string;
  };
};

const WordSearchRecipeList: React.FC<Props> = ({
  recipes,
  option,
  loading,
  fetched,
}) => {
  const [target, setTarget] = useState<HTMLDivElement | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(32);
  const [isLoading, setIsLoading] = useState(false);
  const searchData = useRecoilValue(searchAtom);

  const lastIdx = currentPage * postPerPage;

  /* 마지막 페이지에 따라 게시물의 수를 변경 */
  const limitNumOfItems = (items: any[]) => {
    let currentItems;
    currentItems = items.slice(0, lastIdx);
    return currentItems;
  };

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

  // const RecipeCard = React.lazy(() => import('./RecipeCard'));

  const filteredRecipes = recipes?.filter((recipe: any) => {
    if (option?.kind === '페스코') {
      return (
        recipe.kind === '페스코' ||
        recipe.kind === '락토' ||
        recipe.kind === '오보' ||
        recipe.kind === '비건' ||
        recipe.kind === '락토/오보' ||
        recipe.method === option?.method ||
        recipe.occ === option?.occ
      );
    }
    if (option?.kind === '락토오보') {
      return (
        recipe.kind === '락토' ||
        recipe.kind === '오보' ||
        recipe.kind === '락토/오보' ||
        recipe.method === option?.method ||
        recipe.occ === option?.occ
      );
    }
    return (
      recipe.kind === option?.kind ||
      recipe.method === option?.method ||
      recipe.occ === option?.occ
    );
  });

  return (
    <>
      <RecipesLayout>
        {!fetched && !loading && (
          <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>
        )}
        {loading && (
          <LoadingContainer>
            <h2>레시피를 찾는 중입니다.</h2>
            <LoadingSpinner />
          </LoadingContainer>
        )}

        {fetched && (
          <h2>
            총 <HighLight>{filteredRecipes.length}</HighLight>건의 레시피를
            찾았습니다!
          </h2>
        )}
        <hr />
        <RecipeListContainer>
          {fetched &&
            limitNumOfItems(filteredRecipes).map((recipe: any) => (
              <RecipeCard
                key={recipe.recipe_id}
                id={recipe.recipe_id}
                image={recipe.main_image}
                title={recipe.name}
                rating={recipe.mean_rating}
                kind={recipe.kind}
                method={recipe.method}
                occasion={recipe.occation}
              />
            ))}
        </RecipeListContainer>
      </RecipesLayout>
      <div ref={setTarget}></div>
    </>
  );
};

export default WordSearchRecipeList;

const LoadingContainer = styled.div`
  text-align: center;
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

  ${(recipes) =>
    recipes &&
    css`
      width: fit-content;
      height: fit-content;
    `}

  & div {
    transition: 200ms ease-out;
  }

  & > div:hover {
    transform: scale(1.1);
  }

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
