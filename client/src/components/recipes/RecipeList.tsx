import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { RecipesLayout } from '../layout/RecipesLayout';
import { HighLight } from '../text/Highlight';
import { recipeData } from '../../assets/data/mockRecipeData';
import { Title } from '../text/Title';

type Props = {
  cardNum?: string[];
};

const RecipeList: React.FC<Props> = () => {
  const [recipeList, setRecipeList] = useState([{}]);

  useEffect(() => {
    setRecipeList(recipeData.recipes);
  }, []);

  if (recipeList.length < 1) {
    return <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>;
  }

  return (
    <RecipesLayout>
      <h2>
        총 <HighLight>{recipeList.length}</HighLight>건의 레시피를 찾았습니다!
      </h2>
      <hr />
      <RecipeListContainer>
        {recipeData.recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe_id}>
            <div
              style={{
                width: '100%',
                height: '70%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${recipe.main_image})`,
                backgroundRepeat: 'no-repeat',
                borderRadius: '8px 8px 0 0',
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
