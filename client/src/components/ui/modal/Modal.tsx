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
  message?: string;
  className?: string;
};

const portal = document.getElementById('overlay');

const Modal: React.FC<ModalProps> = ({
  children,
  className,
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
        <ModalOverlay className={className}>
          <h3>{message}</h3>
          {children}
          <ButtonContainer>
            <Button onClick={handleConfirm}>확인</Button>
            {!invalid && (
              <Button className={className} onClick={handleCancel}>
                취소
              </Button>
            )}
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

  &.guide {
    display: none;
  }
`;
