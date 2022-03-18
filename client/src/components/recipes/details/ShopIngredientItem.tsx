import React from 'react';
import styled from 'styled-components';

type Props = {
  ingredient: string;
};

const ShopIngredientItem: React.FC<Props> = ({ ingredient }) => {
  return (
    <ShopIngredientItemContainer>
      <span>{ingredient}</span>
      <ShopIngredientLinkWrapper>
        <a
          href={`https://www.oasis.co.kr/product/search?keyword=${ingredient}`}
          rel='noreferrer'
          target='_blank'
        >
          <ShopLinkImage
            src='/images/shops/oasis_icon.png'
            alt='오아시스 링크'
          />
        </a>
        <a
          href={`https://www.ssg.com/search.ssg?target=all&query=${ingredient}`}
          rel='noreferrer'
          target='_blank'
        >
          <ShopLinkImage src='/images/shops/ssg_icon.png' alt='SSG 링크' />
        </a>
        <a
          href={`https://www.coupang.com/np/search?component=&q=${ingredient}`}
          rel='noreferrer'
          target='_blank'
        >
          <ShopLinkImage src='/images/shops/cupang_icon.png' alt='쿠팡 링크' />
        </a>
      </ShopIngredientLinkWrapper>
    </ShopIngredientItemContainer>
  );
};

export default ShopIngredientItem;

const ShopIngredientItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  margin: 0.8rem;
  padding: 1rem;
  width: 100%;

  > span {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 180px;
  }
`;

const ShopIngredientLinkWrapper = styled.div`
  display: flex;
  > a {
    margin: 0.3rem;
  }
`;

const ShopLinkImage = styled.img`
  height: 4.5rem;
  margin: 0.5rem;
  @media (max-width: 768px) {
    height: 3rem;
    margin: 0;
  }
`;
