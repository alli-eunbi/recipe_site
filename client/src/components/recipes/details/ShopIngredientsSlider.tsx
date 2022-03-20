import React, { useRef, useEffect, useState, MouseEventHandler } from 'react';
import styled from 'styled-components';
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

  const handleNextSlide = () => {
    if (currentSlide >= totalSlides - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const handlePrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(totalSlides - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSelectSlide: MouseEventHandler = (e) => {
    const element = e.target as Element;
    setCurrentSlide(Number(element.id));
  };

  return (
    <>
      <IngredientsIndicator>
        {ingredients.map((item: string, idx: number) => (
          <span id={idx.toString()} onClick={handleSelectSlide}>
            {item}
          </span>
        ))}
      </IngredientsIndicator>
      <ShopIngredientsSlider>
        <Button className='img-slide' onClick={handlePrevSlide}>
          &lt;
        </Button>
        <ShopIngredientsContainer>
          <Slide ref={slideRef}>
            {ingredients.map((ingredient: string) => (
              <ShopIngredientItem key={ingredient} ingredient={ingredient} />
            ))}
          </Slide>
        </ShopIngredientsContainer>
        <Button className='img-slide' onClick={handleNextSlide}>
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

const IngredientsIndicator = styled.div`
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;

  > span {
    text-align: center;
    background-color: teal;
    opacity: 0.9;
    padding: 0.4rem;
    margin: 0.2rem;
    border-radius: 25px;
    color: white;
    cursor: pointer;
    word-break: keep-all;
    transition: 200ms ease-in-out;

    &:hover {
      box-shadow: 0 6px 20px 0 rgb(0 0 0 / 19%);
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

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
