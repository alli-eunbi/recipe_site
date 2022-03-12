import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const ModalOverlay: React.FC<Props> = (props) => {
  return (
    <ModalContainer className={props.className}>
      <div>{props.children}</div>
    </ModalContainer>
  );
};

export default ModalOverlay;

const ModalContainer = styled.div`
  position: fixed;
  top: 20vh;
  left: 30%;
  width: 40%;
  background-color: white;
  padding: 1rem;
  text-align: center;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  &.additional-ingredient {
    top: 15%;
    left: 30%;
    width: 40%;
    padding: 2rem;
  }

  &.guide {
    top: 5%;
    left: 10%;
    width: 80%;
    padding: 2rem;
  }

  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
