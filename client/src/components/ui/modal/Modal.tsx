import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
import ModalOverlay from './ModalOverlay';
import ReactDOM from 'react-dom';
import BackDrop from './BackDrop';

type ModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  invalid?: boolean;
  message: string;
};

const portal = document.getElementById('overlay');

const Modal: React.FC<ModalProps> = ({
  children,
  message,
  onConfirm,
  onCancel,
  invalid,
}) => {
  const handleConfirm = () => {
    if (invalid) {
      onCancel();
    }
    onConfirm();
  };
  console.log(invalid);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onCancel={handleCancel} />,
        portal as Element
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <p>{message}</p>
          <ButtonContainer>
            <Button onClick={handleConfirm}>확인</Button>
            {!invalid && <Button onClick={handleCancel}>취소</Button>}
          </ButtonContainer>
        </ModalOverlay>,
        portal as Element
      )}
    </>
  );
};

export default Modal;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  > button {
    margin: 0 0.3rem;
    height: 2.5rem;
    width: 4rem;
  }
`;
