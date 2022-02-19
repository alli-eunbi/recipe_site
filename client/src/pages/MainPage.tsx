import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';
import { useQuery } from 'react-query';
import { testRequest } from '../api/test';
import { Title } from '../components/text/Title';
import { mainPageText } from '../assets/data/mainPageText';

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
    <Swiper
      modules={[Mousewheel, Pagination]}
      slidesPerView={1}
      mousewheel={true}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {mainPageText.map((text) => (
        <SwiperSlide key={text.title}>
          <MainDisplay>
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
