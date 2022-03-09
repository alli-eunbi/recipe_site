import React from 'react';
import styled from 'styled-components';

import { animation } from '../styles/animation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import { Title } from '../components/text/Title';
import { mainPageText } from '../assets/data/mainPageText';
import Button from '../components/ui/button/Button';
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
    >
      {mainPageText.map((text, idx) => (
        <SwiperSlide key={text.title}>
          <MainDisplay>
            <DescImgContainer
              style={{
                backgroundImage: `url(/images/main/main${idx + 1}.png)`,
              }}
            ></DescImgContainer>
            <DescriptionContainer>
              <Title>{text.title}</Title>
              <MainSubTitle>{text.subTitle}</MainSubTitle>
              <MainDesc>{text.description}</MainDesc>
              <Button
                className='main'
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  animation: appearText 0.4s ease-out forwards;
  ${animation};
`;

const MainSubTitle = styled.h2`
  margin: 20px 0;
`;

const MainDesc = styled.p`
  margin: 20px 0;
  font-size: 1.1rem;
`;

const MainDisplay = styled.main`
  margin-top:  5rem;
  height: 92vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  word-break: keep-all;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    text-align: center;

    > div {
      width: 400px;
      margin-top: 1rem;
    }

    > div > h1 {
      font-size: 1.2rem;
    }
    > div > h2 {
      font-size: 1rem;
    }
    > div > p {
      font-size: 0.9rem;
    }

  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;
    text-align: center;

    > div {
      width: 300px;
      margin-top: 1rem;
    }

    > div > h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem; 
    }
    > div > h2 {
      font-size: 1rem;
    }
    > div > p {
      font-size: 0.8rem;
    }
  }
`;
