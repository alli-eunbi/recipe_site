import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../../ui/button/Button';

type Props = {
  id: string;
  onChangeStep: ChangeEventHandler;
  cookingStep: any;
  stepNum: number[];
  onChangeNum: any;
  imgContent: { files: {}; url: {} };
  onChangeImg: any;
};

const UpdateRecipeSteps: React.FC<Props> = ({
  cookingStep,
  onChangeNum,
  onChangeStep,
  imgContent,
  onChangeImg,
  id,
  stepNum,
  children,
}) => {
  /* 각 인풋 동적으로 변경 */

  const handleStepChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    e.stopPropagation();
    onChangeStep({
      ...cookingStep,
      [e.target.id]: e.target.value,
    });
  };

  const handleDeleteStep: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    // if (Number(id) === 0) {
    //   onChangeStep({
    //     ...cookingStep,
    //     [id]: '',
    //   });
    //   onChangeImg({
    //     files: imgContent.files.filter((item, idx) => idx !== Number(id)),
    //     url: { ...imgContent.url, [`step${Number(id) + 1}`]: '' },
    //   });
    // } else {
    //   onChangeNum(stepNum.slice(0, -1));
    //   const element = event.target as Element;
    onChangeStep({
      ...cookingStep,
      [id]: '',
    });
    onChangeImg({
      files: { ...imgContent.files, [`step${Number(id) + 1}`]: '' },
      url: { ...imgContent.url, [`step${Number(id) + 1}`]: '' },
    });
    // }
  };

  return (
    <StepContainer>
      <StepInputWrapper>
        <StepInput
          id={id}
          value={cookingStep[id]}
          placeholder='조리 단계를 상세히 입력해 주세요'
          onChange={handleStepChange}
        />
        <PhotoInputAndButtonWrap>
          {children}
          <Button id={id} className='delete' onClick={handleDeleteStep}>
            삭제
          </Button>
        </PhotoInputAndButtonWrap>
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

const StepInput = styled.textarea`
  height: 12rem;
  width: 20rem;
  margin-right: 2rem;
  resize: none;
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
