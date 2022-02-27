import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HighLight } from '../../components/text/Highlight';
import { useQuery } from 'react-query';
import { fetchDetailInfo } from '../../api/recipes';
import LoadingSpinner from '../LoadingSpinner';
import StarRatings from 'react-star-ratings';
import { kindMapper } from '../../assets/data/kindMapper';

const RecipeInfo: React.FC = () => {
  const params = useParams().id;

  const { data, isLoading } = useQuery('recipe-detail', () =>
    fetchDetailInfo(params)
  );

  console.log(data?.data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const lastIdx = data?.data.cooking_step.length - 1;

  return (
    <div>
      <DetailContainer>
        <h2>{data?.data.recipe_name}</h2>
        <hr />
        <PhotoContainer
          style={{ backgroundImage: `url(${data?.data.main_image})` }}
        />
        <SummarySection>
          <IconsWrapper>
            <IconContainer>
              <img src='/images/people.png' alt={data?.data.serving} />
              <p>{data?.data.serving}</p>
            </IconContainer>
            <IconContainer>
              <img src='/images/clock.png' alt={data?.data.time} />
              <p>{data?.data.time}</p>
            </IconContainer>
          </IconsWrapper>
          <p>
            <HighLight>작성자: </HighLight>
            {data?.data.user_nickname}
          </p>
          <p>
            <HighLight>평점: {data?.data.mean_rating}점</HighLight>
          </p>
          <StarRatings
            rating={data?.data.mean_rating}
            starDimension='30px'
            starSpacing='1px'
          />
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
          <IngredientBox>
            <HighLight>필요 재료: </HighLight>
            {data?.data.total_ingredients}
          </IngredientBox>

          <p>
            <HighLight>작성: </HighLight>
            {data?.data.created_at}
          </p>
          <div>
            <CookingStepContainer>
              <h2>조리 단계</h2>
              {data?.data.cooking_step.map((step: string, idx: number) => (
                <div>
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
          </div>
        </SummarySection>
      </DetailContainer>
    </div>
  );
};

export default RecipeInfo;

const StepNumber = styled.div`
  border-radius: 50%;
  background-color: #89c53f;
  width: 3.2rem;
  height: 3.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 1.2rem;
  }
`;

const IngredientBox = styled.div`
  width: 80%;
  word-break: keep-all;
`;

const Description = styled.li`
  word-break: keep-all;
  font-size: 20px;
  list-style: none;
  margin-left: 2rem;
  line-height: 2rem;
  white-space: break-spaces;
`;

const DescImage = styled.img`
  border-radius: 4px;
  width: 450px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

const SummarySection = styled.div`
  margin: 3rem;
`;

const DescContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  justify-content: center;
  margin: 1.5rem 0 auto;
  width: 100%;
`;

const CookingStepContainer = styled.div`
  margin: 4rem;

  > div {
    margin: 3rem auto;
    border-radius: 25px 25px 4px 4px;
  }
`;

const IconContainer = styled.div`
  background-color: lightgrey;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    width: 40px;
  }

  > p {
    margin-top: 5px;
  }
`;

const PhotoContainer = styled.div`
  height: 500px;
  width: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DetailContainer = styled.div`
  margin-top: 3rem;
  height: fit-content;
  width: 60rem;
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
