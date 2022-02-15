import React, { useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';

const MainPage: React.FC = () => {
  return (
    <>
      <Swiper
        modules={[Mousewheel, Pagination]}
        slidesPerView={1}
        mousewheel={true}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <MainDisplay>
            <h1>내용</h1>
          </MainDisplay>
        </SwiperSlide>
        <SwiperSlide>
          <MainDisplay>
            <h1>내용</h1>
          </MainDisplay>
        </SwiperSlide>
        <SwiperSlide>
          <MainDisplay>
            <h1>내용</h1>
          </MainDisplay>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainPage;

const MainDisplay = styled.main`
  height: 100vh;
  width: 100vw;
`;
