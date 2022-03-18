import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HighLight } from '../../text/Highlight';
import Button from '../../ui/button/Button';
import ShopIngredientItem from './ShopIngredientItem';

type Props = {
  ingredients: string[];
};

const ShopIngredients: React.FC<Props> = ({ ingredients }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = ingredients.length;

  useEffect(() => {
    if (slideRef && slideRef.current) {
      slideRef.current.style.transition = 'all 400ms ease-in-out';
      slideRef.current.style.marginBottom = '0';
      slideRef.current.style.transform = `translateX(-${
        (currentSlide * 100) / totalSlides
      }%)`;
    }
  }, [currentSlide]);

  /* 첫 마운트 시 리셋 */
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const nextSlide = () => {
    if (currentSlide >= totalSlides - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(totalSlides - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <ShopIngredientsSlider>
        <Button className='img-slide' onClick={prevSlide}>
          &lt;
        </Button>
        <ShopIngredientsContainer>
          <Slide ref={slideRef}>
            {ingredients.map((ingredient: string) => (
              <ShopIngredientItem key={ingredient} ingredient={ingredient} />
            ))}
          </Slide>
        </ShopIngredientsContainer>
        <Button className='img-slide' onClick={nextSlide}>
          &gt;
        </Button>
      </ShopIngredientsSlider>
      <SlideIndicator>
        <p>{`${currentSlide + 1}/${totalSlides}`}</p>
      </SlideIndicator>
    </>
  );
};

export default ShopIngredients;

const ShopIngredientsSlider = styled.div`
  display: flex;
  align-items: center;
`;

const Slide = styled.div`
  display: flex;
`;

const ShopIngredientsContainer = styled.section`
  display: flex;
  width: 350px;
  overflow: hidden;
  margin: 1rem;
  border-radius: 8px;
  background-color: #fffafafa;
  box-shadow: 0 6px 20px 0 rgb(0 0 0 / 19%);
  white-space: no-wrap;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SlideIndicator = styled.div`
  background-color: teal;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  opacity: 0.7;

  > p {
    color: white;
  }
`;
