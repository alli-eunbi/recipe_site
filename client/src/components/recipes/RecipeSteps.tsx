import React from 'react';
import Input from '../input/Input';
import PhotoInput from '../input/PhotoInput';

const RecipeSteps = React.forwardRef((props) => {
  return (
    <>
      <h3>조리 단계</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Input type='textarea' placeholder='조리 단계를 상세히 입력해 주세요' />
        <PhotoInput />
      </div>
    </>
  );
});

export default RecipeSteps;
