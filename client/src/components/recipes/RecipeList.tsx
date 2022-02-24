import styled from 'styled-components';
import React from 'react';
import RecipeCard from './RecipeCard';
import { RecipesLayout } from '../layout/RecipesLayout';
import { HighLight } from '../text/Highlight';
import { recipeData } from '../../assets/data/mockRecipeData';
import { Title } from '../text/Title';

type Props = {
  cardNum?: string[];
};

/* 
export const recipeData = 
  {
    ingredients: [
      { ingredient_id: 1, name: '감자' },
      { ingredient_id: 2, name: '당근' },
    ],
    recipes: [
      {
        recipe_id: 1,
        main_image: '',
        recipe_name: '감자볶음',
        mean_rating: 4.5,
        comment_count: 3,
        nickname: '만개의레시피',
        method: '볶기',
        occation: '일상',
        kind: '비건',
      },
    ],
  },

*/

const RecipeList: React.FC<Props> = () => {
  if (recipeData.recipes.length < 1) {
    return <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>;
  }

  return (
    <RecipesLayout>
      <h2>
        총 <HighLight>{recipeData.recipes.length}</HighLight>건의 레시피를
        찾았습니다!
      </h2>
      <hr />
      <RecipeListContainer>
        {recipeData.recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe_id}>
            <img
              style={{
                width: '100%',
                height: '70%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${recipe.main_image})`,
                backgroundRepeat: 'no-repeat',
              }}
            />
            <h3>{recipe.recipe_name}</h3>
            <p>
              <HighLight>평점: </HighLight>
              {recipe.mean_rating}점
            </p>
            <p>
              <HighLight>종류: </HighLight>
              {recipe.kind}
            </p>
            <p>
              <HighLight>방법: </HighLight>
              {recipe.method}
            </p>
          </RecipeCard>
        ))}
      </RecipeListContainer>
    </RecipesLayout>
  );
};

export default RecipeList;

const RecipeListContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 1rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  width: fit-content;

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
