import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HighLight } from '../../text/Highlight';
import { useQuery } from 'react-query';
import {
  fetchDetailInfo,
  deleteRecipe,
  updateRecipe,
} from '../../../api/recipes';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';
import Button from '../../ui/button/Button';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import Modal from '../../ui/modal/Modal';
import ShopIngredients from './ShopIngredientsSlider';
import { useRecoilState } from 'recoil';
import { updateDataState } from '../../../store/store';

const RecipeInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [updateRecipeData, setUpdateRecipeData] =
    useRecoilState(updateDataState);

  const params = useParams().id;

  const token = new Cookies().get('access_token');

  let nickname;

  if (token !== undefined) {
    const decoded: { id: number; nickname: string } = jwt_decode(token);
    nickname = decoded.nickname;
  }

  const { data, isLoading } = useQuery(
    'recipe-detail',
    () => fetchDetailInfo(params),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { refetch: deleteCurrentRecipe } = useQuery(
    'delete-recipe',
    () => deleteRecipe(params),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const { data: updateData, refetch: update } = useQuery(
    'update-recipe',
    () => updateRecipe(params),
    {
      enabled: false,
    }
  );

  const handleUpdate = () => {
    update();
  };

  useEffect(() => {
    if (updateData?.data.success) {
      setUpdateRecipeData(updateData?.data.data);
      navigate('/update-recipe');
    }
  }, [updateData?.data.success]);

  const navigate = useNavigate();

  /* 초기 삭제 버튼을 누르면, 확인 모달창이 뜬다. */
  const handleConfirmDelete = () => {
    setModalMessage('정말로 삭제하시겠습니까?');
    setIsModalOpen(true);
  };

  /* 삭제 후 이전 페이지로 이동 */
  const handleDeleteRecipe = () => {
    deleteCurrentRecipe();
    handleReturnToPrevPage();
  };

  /* 삭제 모달 취소 */
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleReturnToPrevPage = () => {
    navigate('/word-search');
    window.location.reload();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const lastIdx = data?.data.cooking_step.length - 1;

  const customIngredientTrimmed =
    data?.data.total_ingredients[data?.data.total_ingredients.length - 2] ===
    ','
      ? data?.data.total_ingredients.slice(
          0,
          data.data.total_ingredients.length - 2
        )
      : data?.data.total_ingredients;

  return (
    <>
      {isModalOpen && (
        <Modal
          message={modalMessage}
          onConfirm={handleDeleteRecipe}
          onCancel={handleCancelDelete}
        ></Modal>
      )}
      <DetailContainer>
        <DetailHeader>
          <h1>{data?.data.recipe_name}</h1>
        </DetailHeader>
        <hr />
        <PhotoAndSummaryWrapper>
          <PhotoContainer
            style={{ backgroundImage: `url(${data?.data.main_image})` }}
          />
          <SummarySection>
            <p>
              <HighLight>유형: </HighLight>
              {data?.data.occation}
            </p>
            <p>
              <HighLight>종류: </HighLight>
              {data?.data.kind}
            </p>
            <p>
              <HighLight>방법: </HighLight>
              {data?.data.method}
            </p>
            <HighLight className='ingredients'>필요 재료</HighLight>
            <IngredientBox>{customIngredientTrimmed}</IngredientBox>
            <IconsWrapper>
              <IconContainer>
                <img src='/images/detail/people.png' alt={data?.data.serving} />
                <p>{data?.data.serving}</p>
              </IconContainer>
              <IconContainer>
                <img src='/images/detail/clock.png' alt={data?.data.time} />
                <p>{data?.data.time}</p>
              </IconContainer>
            </IconsWrapper>
          </SummarySection>
        </PhotoAndSummaryWrapper>
        <CookingStepContainer>
          <h2>조리 단계</h2>
          {data?.data.cooking_step.map((step: string, idx: number) => (
            <div key={idx}>
              <StepNumber>
                <span>{idx === lastIdx ? '완성!' : idx + 1}</span>
              </StepNumber>
              <DescContainer key={step}>
                <DescImage
                  src={data?.data.cooking_image[idx]}
                  alt={`step${idx}`}
                />
                <Description>{step}</Description>
              </DescContainer>
            </div>
          ))}
        </CookingStepContainer>
        <DetailFooter>
          <p>
            <HighLight>작성자: </HighLight>
            {data?.data.user_nickname}
          </p>
          <p>
            <HighLight>작성일: </HighLight>
            <time dateTime={data?.data.created_at}>
              {data?.data.created_at}
            </time>
          </p>
          {nickname === data?.data.user_nickname && (
            <ModifyBtnContainer>
              <Button className='delete-recipe' onClick={handleConfirmDelete}>
                게시물 삭제
              </Button>
              <Button className='update-recipe' onClick={handleUpdate}>
                게시물 수정
              </Button>
            </ModifyBtnContainer>
          )}
          <Button className='submit' onClick={handleReturnToPrevPage}>
            다른 레시피 보러가기
          </Button>
          <ShopIngredientsSection>
            <h3>재료가 부족한가요?</h3>
            <p>
              총 <HighLight>{data?.data.ingredients_list.length}가지</HighLight>{' '}
              재료를 구매할 수 있습니다.
            </p>
            <ShopIngredients ingredients={data?.data.ingredients_list} />
          </ShopIngredientsSection>
        </DetailFooter>
      </DetailContainer>
    </>
  );
};

export default RecipeInfo;

const DetailHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 8px 8px 0 0;
  opacity: 0.85;

  & > h1 {
    opacity: 1;
    margin: 2rem;
    font-size: 1.8rem;
    color: white;
  }
`;

const PhotoAndSummaryWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const DetailContainer = styled.div`
  margin: 3rem auto;
  height: fit-content;
  width: 80vw;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > hr {
    width: 97%;
    margin-bottom: 2rem;
  }

  > h2 {
    margin: 2rem;
  }
`;

const StepNumber = styled.div`
  border-radius: 50%;
  background-color: #89c53f;
  width: 3.2rem;
  height: 3.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.65;

  > span {
    font-size: 1.2rem;
  }
`;

const IngredientBox = styled.div`
  width: 80%;
  word-break: keep-all;
  text-align: center;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
`;

const DescContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  justify-content: center;
  margin: 1.5rem 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Description = styled.li`
  word-break: keep-all;
  font-size: 18px;
  list-style: none;
  margin-left: 2rem;
  line-height: 2rem;
  white-space: break-spaces;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const DescImage = styled.img`
  border-radius: 4px;
  width: 350px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    height: 250px;
    width: 250px;
  }
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  background-color: rgb(0, 255, 0, 0.04);
  border-radius: 10px;

  & p {
    line-height: 2.5rem;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    width: 90%;
  }
`;

const CookingStepContainer = styled.div`
  margin: 4rem;

  > div {
    margin: 3rem auto;
    border-radius: 25px 25px 4px 4px;
  }
`;

const IconContainer = styled.div`
  background-color: rgb(0, 255, 0, 0.15);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  > img {
    width: 30px;
  }

  > p {
    font-size: 15px;
    font-weight: bold;
  }
`;

const PhotoContainer = styled.div`
  height: 350px;
  width: 350px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 250px;
    width: 250px;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;

  > div {
    margin: 0 1.5rem;
  }
`;

const ModifyBtnContainer = styled.div`
  > button {
    margin: 10px;
  }
`;

const DetailFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  > p {
    line-height: 2rem;
  }
`;

const ShopIngredientsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h3 {
    line-height: 3rem;
  }
`;
