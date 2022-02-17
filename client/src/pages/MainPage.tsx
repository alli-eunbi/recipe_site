import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';
import { useQuery } from 'react-query';
import { testRequest } from '../api/test';

const MainPage: React.FC = () => {
  /* axios.get 코드는 'client/src/api/test.ts'  에 있습니다. */

  const { data, isLoading, refetch } = useQuery('test', testRequest, {
    enabled: false,
  });

  const handleFetch = () => {
    refetch();
  };

  console.log(data?.data);

  return (
    <>
      {/* <Swiper
        modules={[Mousewheel, Pagination]}
        slidesPerView={1}
        mousewheel={true}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      > */}
      <SwiperSlide>
        <MainDisplay>
          {/* 데이터의 내용이 보입니다. */}
          <h1>내용</h1>
          <button onClick={handleFetch}>요청하기</button>
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
      {/* </Swiper> */}
    </>
  );
};

export default MainPage;

const MainDisplay = styled.main`
  margin-top: 10rem;
  height: 100vh;
  width: 100vw;
`;
