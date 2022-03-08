import React from 'react';

type Props = {
  ingredients: string[];
};

const ShopIngredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}>
      <h3>재료를 사야하나요?</h3>
      {ingredients.map((ingredient: string) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {ingredient}:
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <a
              href={`https://www.oasis.co.kr/product/search?keyword=${ingredient}`}
            >
              오아시스 마켓
            </a>
            <a
              href={`https://www.ssg.com/search.ssg?target=all&query=${ingredient}`}
            >
              SSG.COM
            </a>
            <a
              href={`https://www.coupang.com/np/search?component=&q=${ingredient}`}
            >
              쿠팡
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopIngredients;
