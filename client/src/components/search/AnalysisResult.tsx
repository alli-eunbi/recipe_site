import React, { useEffect } from 'react';
import { searchAtom } from '../../store/store';
import { useRecoilState } from 'recoil';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchImageSearchResult } from '../../api/recipes';
import { formData } from '../../components/search/PhotoSearchUploader';
import LoadingSpinner from '../ui/LoadingSpinner';

const AnalysisResult: React.FC = () => {
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useRecoilState(searchAtom);

  const { data, status } = useQuery(
    'image-search',
    () => fetchImageSearchResult(formData),
    {
      cacheTime: 0,
    }
  );

  const handleOpenModal = () => {};

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
          <ul style={{ paddingLeft: '0px' }}>
            {data?.data.ingredients.map((ingredient: {}, idx: number) => (
              <li key={`${ingredient}${idx}`}>{ingredient}</li>
            ))}
          </ul>
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
