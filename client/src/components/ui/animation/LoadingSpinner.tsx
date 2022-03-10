import React from 'react';
import LottieLoader from 'react-lottie-loader';
import styled from 'styled-components';
import Lottie from '../../../assets/lotties/walking-broccoli.json';

const LoadingSpinner: React.FC = ({ children }) => {
  return (
    <LoadingSpinnerWapper>
      {children}
      <LottieLoader animationData={Lottie} />
    </LoadingSpinnerWapper>
  );
};

export default LoadingSpinner;

const LoadingSpinnerWapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  padding: 2rem;
`;
