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
    <Card
      style={{
        width: '40rem',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form action=''>
        <h2 style={{ textAlign: 'center' }}>작성 레시피</h2>
        <div style={{ display: 'flex' }}>
          <Input type='text' placeholder='제목을 입력해주세요' />
          <input type='file' />
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
          <p>요리 종류: </p>
          {KIND_DATA.map((kind) => (
            <img
              style={{
                width: '50px',
                borderRadius: '50%',
                backgroundColor: 'green',
                cursor: 'pointer',
              }}
              key={kind.id}
              id={kind.name}
              onClick={handleSelectKind}
              src={`images/${kind.id}.png`}
              alt={kind.id}
            />
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
      </form>
    </Card>
  );
};

export default RecipeForm;
