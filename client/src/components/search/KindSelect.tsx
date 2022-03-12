import React from 'react';
import IconOption from '../../components/category/IconOption';
import { KIND_DATA } from '../../assets/data/categoryData';
import styled from 'styled-components';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import { animation } from '../../styles/animation';

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
  animation: fadeIn 0.5s ease-out forwards;
  ${animation};

  > h2 {
    margin: 2rem;
  }

  > p {
    font-size: 1.15rem;
  }

  @media (max-width: 768px) {
    width: 20rem;
    height: 30rem;
  }
`;
