import React from 'react';
import { RecipesLayout } from '../components/layout/RecipesLayout';
import RecipeList from '../components/recipes/RecipeList';
import { PageLayout } from '../components/layout/PageLayout';
import { HighLight } from '../components/text/Highlight';

const RecipeBookPage: React.FC = () => {
  const num = ['1', '2'];
  const userNickname = '알렉스';

  return (
    <PageLayout>
      <h1>
        <HighLight>{userNickname}</HighLight>님의 레시피 북
      </h1>
      <RecipesLayout>
        <h2>
          작성하신 <HighLight>레시피</HighLight> 입니다.
        </h2>
        <hr></hr>
        <RecipeList cardNum={num}></RecipeList>
      </RecipesLayout>
      <RecipesLayout>
        <h2>
          저장하신 <HighLight>즐겨찾기 레시피</HighLight> 입니다.
        </h2>
        <hr></hr>
        <RecipeList cardNum={num}></RecipeList>
      </RecipesLayout>
    </PageLayout>
  );
};

export default RecipeBookPage;
