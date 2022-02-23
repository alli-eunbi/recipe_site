import React, { MouseEventHandler, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import { SERVINGS_DATA } from '../../assets/data/categoryData';
import { TIME_DATA } from '../../assets/data/categoryData';
import IngredientItem from './IngredientItemInput';
import IngredientList from './IngredientList';
import styled from 'styled-components';
import PhotoInput from '../input/PhotoInput';

const RecipeForm: React.FC = () => {
  const [ingredientQuantity, setIngredientQuentity] = useState(1);
  const [ingredientList, setIngredientList] = useState([]);

  const handleSelectKind: MouseEventHandler = (e) => {
    console.log(e.currentTarget.id);
  };

  const handleAddIngredient = () => {
    setIngredientQuentity((prevNum) => prevNum + 1);
  };

  return (
    <RecipeFormContainer action=''>
      <RecipeFormHeader>
        <h2>작성 레시피</h2>
        <hr />
      </RecipeFormHeader>
      <div style={{ display: 'flex' }}>
        <Input type='text' placeholder='제목을 입력해주세요' />
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
                {occ.id == 'o_all' ? '선택' : occ.name}
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
        <h3>사용 재료</h3>
        <IngredientList number={ingredientQuantity} list={ingredientList} />
        <button onClick={handleAddIngredient}>재료 추가</button>
      </div>
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
