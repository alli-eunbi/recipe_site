import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../ui/button/Button';

type Props = {
  id: string;
  onChangeStep: ChangeEventHandler;
  cookingStep: any;
  stepNum: number[];
  onChangeNum: any;
  imgContent: File;
  onChangeImg: any;
};

const RecipeSteps: React.FC<Props> = ({
  cookingStep,
  onChangeStep,
  id,
  stepNum,
  onChangeNum,
  imgContent,
  onChangeImg,
  children,
}) => {
  /* 각 인풋 동적으로 변경 */

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
      onChangeNum(reducedStep);
      onChangeStep({
        ...cookingStep,
        [id]: '',
      });
    }
    if (stepNum.length === 1) {
      onChangeStep({
        ...cookingStep,
        [id]: '',
      });
    }
  };

  return (
    <StepContainer>
      <StepInputWrapper>
        <StepInput
          id={id}
          type='textarea'
          value={cookingStep[id]}
          placeholder='조리 단계를 상세히 입력해 주세요'
          onChange={handleStepChange}
        />
        {children}
      </StepInputWrapper>
      <Button id={id} className='delete' onClick={handleDeleteStep}>
        삭제
      </Button>
    </StepContainer>
  );
};

export default RecipeSteps;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StepInput = styled.input`
  height: 12rem;
  width: 20rem;
  margin-right: 2rem;
`;

const StepInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
