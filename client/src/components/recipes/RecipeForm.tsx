import React, { MouseEventHandler, useCallback, useState } from 'react';
import Input from '../input/Input';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import { SERVINGS_DATA } from '../../assets/data/categoryData';
import { TIME_DATA } from '../../assets/data/categoryData';
import IngredientList from './ingredients/IngredientList';
import styled from 'styled-components';
import PhotoInput from '../input/PhotoInput';
import RecipeSteps from './RecipeSteps';
import Button from '../button/Button';
import CategoryOption from '../category/CategoryOption';
import { registerRecipe } from '../../api/recipes';
import { useQuery } from 'react-query';

const RecipeForm: React.FC = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [seasoningList, setSeasoningList] = useState([]);

  const [option, setOption] = useState({
    serving: '',
    time: '',
    kind: '',
    method: '',
    occ: '',
  });

  const [cookingStep, setCookingStep] = useState({});
  const [stepNum, setStepNum] = useState([0]);

  const formData = new FormData();

  const [newRecipe, setNewRecipe] = useState({
    recipe_name: '',
    method: '',
    occasion: '',
    kind: '',
    cooking_step: [],
    cooking_image: {},
    serving: '',
    time: '',
    total_ingredients: { 재료: {}, 양념: {} },
  });

  const {
    data,
    isLoading,
    refetch: registerNewRecipe,
  } = useQuery('register-recipe', () => registerRecipe(newRecipe), {
    enabled: false,
    cacheTime: 0,
  });

  console.log(data?.data);

  /* 레시피 제목 변경 */
  const handleChangeRecipeTitle = useCallback(
    (e) => {
      const title = e.target.value.trim();
      setNewRecipe({ ...newRecipe, ['recipe_name']: title });
    },
    [newRecipe]
  );

  const handleChangeOption = useCallback(
    (value) => {
      const tagType = value.target.name;
      const tagName = value.target.id.slice(1, value.target.id.length);

      setOption({
        ...option,
        [tagType]: tagName,
      });
    },
    [option]
  );

  /* 베지터리안 타입 선택 */
  const handleSelectKind = useCallback(
    (e) => {
      setNewRecipe({ ...newRecipe, ['kind']: e.currentTarget.id });
    },
    [newRecipe]
  );

  /* 재료 */
  const total_ingredient = Object.fromEntries(ingredientList);

  /* 양념 */
  const total_seasoning = Object.fromEntries(seasoningList);

  const handleAddSteps: MouseEventHandler = (e) => {
    e.preventDefault();
    setStepNum((prev) => [
      ...prev,
      prev.length ? Number(prev[prev.length - 1]) + 1 : prev[0] + 1,
    ]);
  };

  /* 레시피 서버로 전송 */
  const handleSubmitRecipe = (e: any) => {
    e.preventDefault();
    setNewRecipe({
      ...newRecipe,
      ['cooking_step']: Object.values(cookingStep),
      ['total_ingredients']: { 재료: total_ingredient, 양념: total_seasoning },
      ['method']: option.method,
      ['occasion']: option.occ,
      ['serving']: option.serving,
      ['time']: option.time,
      ['cooking_image']: formData,
    });

    registerNewRecipe();
  };

  return (
    <RecipeFormContainer action='' onSubmit={handleSubmitRecipe}>
      <RecipeFormHeader>
        <h2>작성 레시피</h2>
        <hr />
      </RecipeFormHeader>
      <div>
        <MainOptionContainer>
          <Input
            type='text'
            style={{ width: '400px', textAlign: 'center' }}
            placeholder='제목을 입력해주세요'
            onChange={handleChangeRecipeTitle}
          />
          <PhotoInput
            id='0'
            style={{ width: '300px', height: '300px' }}
            formData={formData}
          />
          <p>요리 종류</p>
          <FoodKindIconContainer>
            {KIND_DATA.map((kind) => (
              <FoodKindIcon>
                <img
                  key={kind.id}
                  id={kind.name}
                  onClick={handleSelectKind}
                  src={`images/${kind.id}.png`}
                  alt={kind.id}
                />
                <p>{kind.name}</p>
              </FoodKindIcon>
            ))}
          </FoodKindIconContainer>
          <CategoryOptionContainer>
            <CategoryOption
              data={SERVINGS_DATA.slice(1)}
              onChange={handleChangeOption}
              option={option.serving}
            >
              인분:{' '}
            </CategoryOption>
            <CategoryOption
              data={TIME_DATA.slice(1)}
              onChange={handleChangeOption}
              option={option.time}
            >
              시간:
            </CategoryOption>
            <CategoryOption
              data={METHOD_DATA.slice(1)}
              onChange={handleChangeOption}
              option={option.method}
            >
              방법:
            </CategoryOption>
            <CategoryOption
              data={OCC_DATA.slice(1)}
              onChange={handleChangeOption}
              option={option.occ}
            >
              상황:
            </CategoryOption>
          </CategoryOptionContainer>
        </MainOptionContainer>
      </div>
      <p>사용 재료</p>
      <IngredientContainer>
        <IngredientList
          text='사용 재료'
          list={ingredientList}
          onChangeList={setIngredientList}
        />
      </IngredientContainer>
      <p>사용 양념</p>
      <IngredientContainer>
        <IngredientList
          text='사용 양념'
          list={seasoningList}
          onChangeList={setSeasoningList}
        />
      </IngredientContainer>
      <StepContainer>
        {stepNum.map((idx) => (
          <>
            <h3>조리 단계 {Number(Object.keys(stepNum).splice(idx, 1)) + 1}</h3>
            <RecipeSteps
              key={idx}
              id={idx.toString()}
              cookingStep={cookingStep}
              onChangeStep={setCookingStep}
              stepNum={stepNum}
              onChangeNum={setStepNum}
            >
              <PhotoInput id={idx + 1} formData={formData} />
            </RecipeSteps>
          </>
        ))}
      </StepContainer>
      <Button style={{ marginBottom: '2rem' }} onClick={handleAddSteps}>
        순서 추가
      </Button>
      <Button style={{ marginBottom: '2rem', height: '3rem', width: '12rem' }}>
        작성 완료
      </Button>
    </RecipeFormContainer>
  );
};

export default RecipeForm;

const RecipeFormContainer = styled.form`
  margin: 3rem auto;
  height: fit-content;
  width: 60rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecipeFormHeader = styled.header`
  margin: 1rem auto;
  width: 100%;
  > h2 {
    text-align: center;
    margin: 1rem;
  }
`;

const MainOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    margin-top: 1.5rem;
    font-size: 1.2rem;
  }
`;

const StepContainer = styled.div`
  margin: 20px;
`;

const CategoryOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 30px;
`;

const FoodKindIconContainer = styled.div`
  text-align: center;
  display: flex;
  margin: 10px auto;

  > div > p {
    font-size: 15px;
    color: white;
  }
`;

const IngredientContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FoodKindIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: green;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 40px;
  }

  & > span {
    position: absolute;
    background-color: white;
    border-radius: 4px;
    padding: 0.5rem;
    display: none;
    transition: 200ms ease-out;
  }

  &:hover {
    & + span {
      display: inline;
    }
  }

  &:active {
    opacity: 0.2;
  }
`;
