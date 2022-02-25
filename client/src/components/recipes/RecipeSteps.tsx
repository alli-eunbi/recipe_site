import React, {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
} from 'react';
import Input from '../input/Input';
import PhotoInput from '../input/PhotoInput';

type Props = {
  id: string;
  onChangeStep: ChangeEventHandler;
  cookingStep: any;
  stepNum: number[];
  onChangeNum: any;
};

const RecipeSteps: React.FC<Props> = ({
  cookingStep,
  onChangeStep,
  id,
  stepNum,
  onChangeNum,
}) => {
  /* 각 인풋 동적으로 변경 */

  console.log(cookingStep);
  const handleStepChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeStep({
      ...cookingStep,
      [e.target.id]: e.target.value,
    });
  };

  const handleDeleteStep: MouseEventHandler = (event) => {
    event.preventDefault();
    if (stepNum.length > 1) {
      const reducedStep = stepNum.filter((item) => item.toString() !== id);
      console.log(reducedStep);
      onChangeNum(reducedStep);
      onChangeStep({
        ...cookingStep,
        [id]: '',
      });
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <input
          id={id}
          type='textarea'
          style={{ height: '10rem', width: '20rem' }}
          value={cookingStep[id]}
          placeholder='조리 단계를 상세히 입력해 주세요'
          onChange={handleStepChange}
        />
        <PhotoInput />
      </div>
      <button id={id} onClick={handleDeleteStep}>
        삭제
      </button>
    </div>
  );
};

export default RecipeSteps;
