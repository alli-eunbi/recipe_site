import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
  useRef,
} from 'react';
import Input from '../input/Input';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import { SERVINGS_DATA } from '../../assets/data/categoryData';
import { TIME_DATA } from '../../assets/data/categoryData';
import IngredientList from './ingredients/IngredientList.jsx';
import styled from 'styled-components';
import PhotoInput from '../input/PhotoInput';
import axios from 'axios';
import RecipeSteps from './RecipeSteps';
import Button from '../button/Button';

// 넘겨야 할 정보 예시
// {
//   recipe_name: 바나나 셀러드
//   main_image: 음식 사진
//   method: 음식 방법
//   occation: 상황
//   kind: 종류
//   cooking_step: ['물을 준비한다.', '양파를 자르자', ...]
//   cooking_image: ['1단계 이미지', '2단계 이미지', ...]
//   serving: 2인분
//   time: 15분 이내
//   total_ingredients: { 재료: {감자: 500g, 김치: 1포기, ...}, 양념: {소금: 1T, 간장 2T,...} }
//   created_at: 작성일
//   }

const RecipeForm: React.FC = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [seasoningList, setSeasoningList] = useState([]);
  const [cookingStep, setCookingStep] = useState('');
  const [images, setImages] = useState('');
  const [stepNum, setStepNum] = useState([1]);

  const [content, setContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState({
    fileName: '',
    filePath: '',
  });

  const stepRef = useRef<HTMLDivElement[]>([]);

  const [newRecipe, setNewRecipe] = useState({
    recipe_name: '',
    main_image: '',
    method: '',
    occation: '',
    kind: '',
    cooking_step: [],
    cooking_image: [],
    serving: '',
    time: '',
    total_ingredients: { 재료: {}, 양념: {} },
    created_at: '',
  });

  const handleChangeRecipeTitle: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const title = e.target.value.trim();
        setNewRecipe({ ...newRecipe, ['recipe_name']: title });
      },
      [newRecipe]
    );

  const handleSelectKind: MouseEventHandler = useCallback(
    (e) => {
      setNewRecipe({ ...newRecipe, ['kind']: e.currentTarget.id });
    },
    [newRecipe]
  );

  /* 재료 */
  const total_ingredient = Object.fromEntries(ingredientList);

  console.log(total_ingredient);
  /* 양념 */
  
  const total_seasoning = Object.fromEntries(seasoningList);
  console.log(total_seasoning)

  const handleSubmitRecipe = (e: any) => {
    e.preventDefault();
    // navigate('/search');
    const formData = new FormData();

    formData.append('file', content);

    let variables = [
      {
        title: '1번',
        content: '1번 레시피 조리 순서입니다.',
      },
    ];

    formData.append(
      'data',
      new Blob([JSON.stringify(variables)], { type: 'application/json' })
    );

    axios
      .post('http://localhost:5000/recipe-board/register', formData)
      .then((res) => {
        const { fileName } = res.data;
        console.log(fileName);
        setUploadedImage(fileName);
      });
  };

  return (
    <RecipeFormContainer action=''>
      <RecipeFormHeader>
        <h2>작성 레시피</h2>
        <hr />
      </RecipeFormHeader>
      <div style={{ display: 'flex' }}>
        <Input
          type='text'
          placeholder='제목을 입력해주세요'
          onChange={handleChangeRecipeTitle}
        />
        <PhotoInput />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <p>요리 방법</p>
          <select name='cooking-method' id=''>
            {METHOD_DATA.map((method) => (
              <option key={method.id}>
                {method.id === 'm_all' ? '선택' : method.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>요리 상황</p>
          <select name='cooking-occasion' id=''>
            {OCC_DATA.map((occ) => (
              <option key={occ.id}>
                {occ.id === 'o_all' ? '선택' : occ.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h3>요리 종류: </h3>
        {KIND_DATA.map((kind) => (
          <>
            <FoodKindIcon
              key={kind.id}
              id={kind.name}
              onClick={handleSelectKind}
              src={`images/${kind.id}.png`}
              alt={kind.id}
            />
            <span>{kind.name}</span>
          </>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <p>인분</p>
          <select name='servings' id=''>
            {SERVINGS_DATA.map((serving) => (
              <option key={serving}>{serving}</option>
            ))}
          </select>
        </div>
        <div>
          <p>소요시간</p>
          <select name='servings' id=''>
            {TIME_DATA.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <IngredientList
          text='사용 재료'
          list={ingredientList}
          onChangeList={setIngredientList}
        />
      </div>
      <div>
        <IngredientList
          text='사용 양념'
          list={seasoningList}
          onChangeList={setSeasoningList}
        />
      </div>
      {stepNum.map((idx) => (
        <RecipeSteps
          ref={(el) =>
            ((stepRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)
          }
        />
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          setStepNum((prev) => [...prev, Number(prev[prev.length - 1]) + 1]);
        }}
      >
        순서 추가
      </button>
    </RecipeFormContainer>
  );
};

export default RecipeForm;

const RecipeFormContainer = styled.form`
  margin-top: 3rem;
  height: fit-content;
  width: 40rem;
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
  }
`;

const FoodKindIcon = styled.img`
  width: 50px;
  border-radius: 50%;
  background-color: green;
  cursor: pointer;
  margin-left: 1rem;

  & + span {
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
`;
