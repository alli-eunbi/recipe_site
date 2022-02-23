import React from 'react';
import styled from 'styled-components';
import Button from './button/Button';

type ModalProps = {
  message: string;
  onCancel: () => void;
};

const Modal: React.FC<ModalProps> = ({ message, onCancel }) => {
  const handleCancel = () => {
    onCancel();
  };
  return (
    <ModalContainer>
      {message}
      <Button onClick={handleCancel}>확인</Button>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  text-align: center;
  width: 30rem;
  z-index: 11;
  position: fixed;
  top: 25vh;
  left: calc(50% - 15rem);
`;
