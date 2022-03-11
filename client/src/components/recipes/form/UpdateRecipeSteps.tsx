import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../../ui/button/Button';

type Props = {
  id: string;
  onChangeStep: ChangeEventHandler;
  cookingStep: any;
  stepNum: number[];
  onChangeNum: any;
  imgContent: File;
  onChangeImg: any;
};

const UpdateRecipeSteps: React.FC<Props> = ({
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
    e.stopPropagation();
    onChangeStep({
      ...cookingStep,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <StepContainer>
      <StepInputWrapper>
        <StepInput
          id={id}
          type='textarea'
          defaultValue={cookingStep[id]}
          placeholder='조리 단계를 상세히 입력해 주세요'
          onChange={handleStepChange}
        />
        <PhotoInputAndButtonWrap>{children}</PhotoInputAndButtonWrap>
      </StepInputWrapper>
    </StepContainer>
  );
};

export default UpdateRecipeSteps;

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

const PhotoInputAndButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StepInputWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
