import React from 'react';
import { searchAtom } from '../store/store';
import { useRecoilValue } from 'recoil';
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import styled from 'styled-components';
import { HighLight } from '../components/text/Highlight';

const AnalysisResultPage: React.FC = () => {
  const searchResult = useRecoilValue(searchAtom);
  const navigate = useNavigate();

  return (
    <PageLayout>
      <AnalysisResultContainer>
        <h2>사진 분석을 통한 재료 내용입니다.</h2>
        {searchResult.ingredients.map((ingredient) => (
          <div>
            <HighLight key={ingredient}>{ingredient}</HighLight>
          </div>
        ))}
        <Button onClick={() => navigate('/search')}>레시피 보러가기</Button>
      </AnalysisResultContainer>
    </PageLayout>
  );
};

export default AnalysisResultPage;

const AnalysisResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  width: 30rem;
  margin-top: 4rem;
  top: 20%;
  left: 30%;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
