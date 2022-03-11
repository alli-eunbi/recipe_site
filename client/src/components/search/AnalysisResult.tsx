import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { ingredientsState } from '../../store/store';
import { useRecoilState } from 'recoil';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchIngredientsFromImage } from '../../api/recipes';
import { formData } from './ImageSearchUploader';
import LoadingSpinner from '../ui/animation/LoadingSpinner';
import Modal from '../ui/modal/Modal';
import Input from '../ui/input/Input';
import IngredientCardList from '../recipes/ingredients/IngredientCardList';
import AdditionalIngredients from '../recipes/ingredients/AdditionalIngredients';
import { HighLight } from '../text/Highlight';
import { animation } from '../../styles/animation';
import NoneFound from '../ui/animation/NoneFound';

const AnalysisResult: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ingredients, setIngredients] = useRecoilState<any>(ingredientsState);
  const [nutrients, setNutrients] = useState([]);
  const [calories, setCalories] = useState([]);
  const [addition, setAddition] = useState<string>('');

  const additionInputRef = useRef<HTMLInputElement>(null as any);

  const {
    data: ingredientData,
    status,
    isLoading,
  } = useQuery(
    'ingredients-from-image',
    () => fetchIngredientsFromImage(formData),
    {
      cacheTime: 0,
    }
  );

  const backUpIngredients = ingredients.slice();

  const handleOpenModal = () => {
    if (ingredientData?.data.length > 0) {
      setIngredients(ingredientData?.data.map((item: any) => item.ingredient));
    } else {
      setIngredients(['']);
    }
    setIsModalOpen(true);
  };

  const handleAddIngredient = () => {
    if (addition !== '') {
      const newIngredientsList: string[] = [...ingredients];
      newIngredientsList.push(addition);
      setIngredients(newIngredientsList);
    }
    setAddition('');
    additionInputRef.current.focus();
  };

  const handleSubmitAddition = () => {
    navigate('/image-search');
  };

  const handleChangeAddition: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddition(e.target.value);
  };

  const handleRemoveAddition = (id: number) => {
    const ingredientToRemove = ingredients[id];
    const newIngredientList = ingredients.filter(
      (item: string) => item !== ingredientToRemove
    );
    setIngredients(newIngredientList);
  };

  const handleCancelModal = () => {
    setIngredients(backUpIngredients);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (status === 'success') {
      setIngredients(ingredientData?.data.map((item: any) => item.ingredient));
      setNutrients(
        ingredientData?.data.map((item: any) => [
          item.carb,
          item.protein,
          item.fat,
        ])
      );
      setCalories(ingredientData?.data.map((item: any) => item.calorie));
    }

    if (ingredientData?.data.length === 0) {
      setIngredients([]);
      setNutrients([]);
      setCalories([]);
    }
  }, [ingredientData?.data]);

  if (ingredientData?.data.length === 0) {
    return (
      <AnalysisResultContainer>
        <NoneFound>
          <p>해당 사진에서는 재료를 찾을 수 없군요...</p>
        </NoneFound>
        <ButtonContainer>
          <Button className='submit' onClick={() => navigate('/image-upload')}>
            사진 다시 올리기
          </Button>
          <Button className='submit' onClick={() => navigate('/word-search')}>
            직접 검색하기
          </Button>
        </ButtonContainer>
      </AnalysisResultContainer>
    );
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          className='additional-ingredient'
          message='추가재료'
          onConfirm={handleSubmitAddition}
          onCancel={handleCancelModal}
        >
          <p>소금과 같은 기본 양념은 제외해 주시기 바랍니다.</p>
          <AdditionalIngredients
            ingredients={ingredients}
            onClick={handleRemoveAddition}
          />
          <Input
            type='text'
            value={addition}
            placeholder='추가재료를 입력해주세요.'
            className='modal-input'
            onChange={handleChangeAddition}
            ref={additionInputRef}
          />
          <Button className='add-ingredient' onClick={handleAddIngredient}>
            추가
          </Button>
        </Modal>
      )}
      <AnalysisResultContainer>
        {isLoading ? (
          <>
            <LoadingSpinner>
              <h2>분석중입니다...</h2>
            </LoadingSpinner>
          </>
        ) : (
          <>
            <AnaylsisHeader>
              <h2>
                사진에서 <HighLight>{ingredients.length}가지</HighLight> 재료를
                찾았습니다.
              </h2>
            </AnaylsisHeader>
            <IngredientCardList
              className='analysis'
              ingredients={ingredients}
              calories={calories}
              nutrients={nutrients}
            />
            <ButtonContainer>
              <Button
                className='submit'
                onClick={() => navigate('/image-search')}
              >
                재료에 따른 레시피 보러가기
              </Button>
              <Button className='submit' onClick={handleOpenModal}>
                빠진 재료가 있나요?
              </Button>
            </ButtonContainer>
          </>
        )}
      </AnalysisResultContainer>
    </>
  );
};

export default AnalysisResult;

const ButtonContainer = styled.div`
  display: flex;

  > button + button {
    margin-left: 1rem;
  }
`;

const AnaylsisHeader = styled.div`
  padding: 10px;
  margin-top: 1rem;
`;

const AnalysisResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: fit-content;
  width: fit-content;
  margin: 4rem auto;
  top: 20%;
  left: 30%;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  animation: fadeIn 0.5s ease-out forwards;
  ${animation};

  @media (max-width: 900px) {
    width: 350px;
  }

  & > div {
    text-align: center;
  }

  $ > div > ol {
    color: green;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;
