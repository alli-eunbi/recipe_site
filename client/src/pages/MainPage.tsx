import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import { Title } from '../components/text/Title';
import { mainPageText } from '../assets/data/mainPageText';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToRoute = (route: string) => {
    navigate(route);
  };
  return (
    <Swiper
      modules={[Mousewheel, Pagination]}
      slidesPerView={1}
      mousewheel={true}
      pagination={{
        clickable: false,
      }}
    >
      {mainPageText.map((text) => (
        <SwiperSlide key={text.title}>
          <MainDisplay>
            <div>
              <DescImgContainer></DescImgContainer>
            </div>
            <DescriptionContainer>
              <Title>{text.title}</Title>
              <MainSubTitle>{text.subTitle}</MainSubTitle>
              <MainDesc>{text.description}</MainDesc>
              <Button
                style={{ height: '3rem' }}
                onClick={() => navigateToRoute(text.route)}
              >
                {text.buttonText}
              </Button>
            </DescriptionContainer>
          </MainDisplay>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainPage;

const DescImgContainer = styled.div`
  width: 35rem;
  height: 35rem;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const MainSubTitle = styled.h2`
  margin: 20px 0;
`;

const MainDesc = styled.p`
  margin: 20px 0;
`;

const MainDisplay = styled.main`
  margin-top: 5rem;
  height: 91vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
