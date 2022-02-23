import React, { MouseEventHandler } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import RecipeForm from '../components/recipes/RecipeForm';

const CreateRecipePage: React.FC = () => {
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

  return (
    <PageLayout>
      <RecipeForm />
    </PageLayout>
  );
};

export default CreateRecipePage;
