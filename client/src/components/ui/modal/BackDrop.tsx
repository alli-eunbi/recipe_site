import React from 'react';
import styled from 'styled-components';

type Props = {
  onCancel: () => void;
};

const BackDrop: React.FC<Props> = ({ onCancel }) => {
  const handleCancel = () => {
    onCancel();
  };

  return <BackDropContainer onClick={handleCancel} />;
};

export default BackDrop;

const BackDropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;
