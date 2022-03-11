import React, { useEffect } from 'react';
import styled from 'styled-components';
import GuideCardList from '../components/guide/GuideCardList';
import { PageLayout } from '../components/layout/PageLayout';
import { animation } from '../styles/animation';
import { guideMain } from '../assets/data/guide';
import { useResetRecoilState } from 'recoil';
import { filterState, ingredientsState, recipesState } from '../store/store';

const GuidePage: React.FC = () => {
  const resetIngredients = useResetRecoilState(ingredientsState);
  const resetRecipe = useResetRecoilState(recipesState);
  const resetFilter = useResetRecoilState(filterState);

  useEffect(() => {
    resetIngredients();
    resetRecipe();
    resetFilter();
  }, []);

  return (
    <PageLayout>
      <GuideHeader>
        {guideMain.map((text: any) => (
          <>
            <h1>{text.title}</h1>
            <p>{text.subtitle}</p>
          </>
        ))}
      </GuideHeader>
      <GuideContainer>
        <GuideCardList />
      </GuideContainer>
    </PageLayout>
  );
};

export default GuidePage;

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  animation: fadeIn 0.5s ease-out forwards;
  ${animation};
`;

const GuideHeader = styled.header`
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    & h1 {
      font-size: 1.2rem;
    }

    & p {
      margin-top: 1rem;
      font-size: 10rem;
    }
  }

  > h1 {
    font-size: 2.5rem;
  }

  > p {
    margin-top: 1rem;
    font-size: 1.4rem;
  }
`;
