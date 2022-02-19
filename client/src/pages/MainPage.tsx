import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper';
import { Title } from '../components/text/Title';
import { mainPageText } from '../assets/data/mainPageText';

const MainPage: React.FC = () => {
  return (
    <Swiper
      modules={[Mousewheel, Pagination]}
      slidesPerView={1}
      mousewheel={true}
    >
      {mainPageText.map((text) => (
        <SwiperSlide key={text.title}>
          <MainDisplay>
            <div></div>
            <div>
              <Title>{text.title}</Title>
              <h2>{text.subTitle}</h2>
              <p>{text.description}</p>
            </div>
          </MainDisplay>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainPage;

const MainDisplay = styled.main`
  margin-top: 5rem;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;
