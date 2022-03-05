import React, {
  ChangeEventHandler,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import IngredientList from '../recipes/IngredientList';
import Error500 from '../../pages/error/Error500';

const AnalysisResult: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ingredients, setIngredients] = useRecoilState<any>(ingredientsState);
  const [addition, setAddition] = useState<string>('');
  // const [newIngredients, setNewIngredients] = useState<any[]>([]);

  const additionInputRef = useRef<HTMLInputElement>(null as any);

  const { data, status, isLoading } = useQuery(
    'ingredients-from-image',
    () => fetchIngredientsFromImage(formData),
    {
      cacheTime: 0,
    }
  );

  const analysedIngredients = data?.data.ingredients
    .map((item: string) => Object.values(item))
    .flat();

  const handleOpenModal = () => {
    setIngredients(analysedIngredients);
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

  console.log(ingredients.join('+'));

  const handleSubmitAddition = () => {
    navigate('/image-search');
  };

  const handleChangeAddition: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddition(e.target.value);
  };

  const handleRemoveAddition = (id: string) => {
    console.log(id);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (status === 'success') {
      setIngredients(analysedIngredients);
    }
  }, [data?.data]);

  // if (isError) {
  //   return <Error500 />;
  // }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isModalOpen && (
        <Modal
          message='추가재료'
          onConfirm={handleSubmitAddition}
          onCancel={handleCancelModal}
        >
          <p>소금과 같은 기본 양념은 제외해 주시기 바랍니다.</p>
          <IngredientList className='additional' ingredients={ingredients} />
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
            <div>
              <h2>사진 분석을 통한 재료 내용입니다.</h2>
            </div>
            <IngredientList
              className='analysis'
              ingredients={analysedIngredients}
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
    </Suspense>
  );
};

export default AnalysisResult;

const ButtonContainer = styled.div`
  display: flex;

  > button + button {
    margin-left: 1rem;
  }
`;

const AnalysisResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 30rem;
  width: 30rem;
  margin-top: 4rem;
  top: 20%;
  left: 30%;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  @media (max-width: 900px) {
    width: 350px;
  }

  & > div {
    text-align: center;
  }

  & > ul {
    padding-left: none;
  }

  & > ul > li {
    list-style: none;
    color: green;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;
