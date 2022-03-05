import React from 'react';
import IconOption from '../../components/category/IconOption';
import { KIND_DATA } from '../../assets/data/categoryData';
import styled from 'styled-components';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';

const KindSelect: React.FC = () => {
  const navigate = useNavigate();
  const handleToNext = () => {
    navigate('/image-upload');
  };
  return (
    <KindSelectContainer>
      <h2>당신은 어떤 종류의 채식주의자입니까?</h2>
      <p>해당 카테고리를 선택해주세요</p>
      <IconOption className='image-submit' data={KIND_DATA}></IconOption>
      <Button className='submit' onClick={handleToNext}>
        다음
      </Button>
    </KindSelectContainer>
  );
};

export default KindSelect;

const KindSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 8rem auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  height: 20rem;
  width: 30rem;

  > h2 {
    margin: 2rem;
  }

  @media (max-width: 400px) {
    width: 20rem;
    height: 30rem;

    > div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
