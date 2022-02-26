import React from 'react';
import LottieLoader from 'react-lottie-loader';
import styled from 'styled-components';
import Lottie from '../assets/lotties/walking-broccoli.json';

const LoadingSpinner: React.FC = () => {
  return (
    <LoadingSpinnerWapper>
      <LottieLoader animationData={Lottie} />
    </LoadingSpinnerWapper>
  );
};

export default LoadingSpinner;

const LoadingSpinnerWapper = styled.div`
  width: 500px;
  height: 500px;
  align-self: center;
`;
