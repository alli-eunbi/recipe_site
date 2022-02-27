import React, { useEffect } from 'react';
import { searchAtom } from '../store/store';
import { useRecoilState } from 'recoil';
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import styled from 'styled-components';
import { HighLight } from '../components/text/Highlight';
import { useQuery } from 'react-query';
import { fetchImageSearchResult } from '../api/recipes';
import { formData } from './UploadPage';
import LoadingSpinner from '../components/LoadingSpinner';

const AnalysisResultPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useRecoilState(searchAtom);

  const { data, status, isLoading } = useQuery(
    'image-search',
    () => fetchImageSearchResult(formData),
    {
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (status === 'success') {
      setSearchResult({
        ...searchResult,
        ['recipes']: data?.data.recipes,
        ['ingredients']: data?.data.ingredients,
      });
    }
  }, [data?.data]);

  return (
    <PageLayout>
      <AnalysisResultContainer>
        {searchResult.recipes.length === 0 ? (
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
            {data?.data.ingredients.map((ingredient: {}, idx: number) => (
              <span key={`${ingredient}${idx}`}>{ingredient}</span>
            ))}
            <Button
              style={{ height: '3rem' }}
              onClick={() => navigate('/image-search')}
            >
              레시피 보러가기
            </Button>
          </>
        )}
      </AnalysisResultContainer>
    </PageLayout>
  );
};

export default AnalysisResultPage;

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

  & > div {
    text-align: center;
  }

  & > span {
    color: green;
    font-size: 30px;
    font-weight: bold;
  }
`;
