import React from 'react';
import LottieLoader from 'react-lottie-loader';
import styled from 'styled-components';
import Lottie from '../../../assets/lotties/walking-broccoli.json';

const LoadingSpinner: React.FC = ({ children }) => {
  return (
    <LoadingSpinnerWapper>
      {children}
      <div>
        <LottieLoader animationData={Lottie} />
      </div>
    </LoadingSpinnerWapper>
  );
};

export default LoadingSpinner;

const LoadingSpinnerWapper = styled.div`
  width: 400px;
  height: 400px;
  align-self: center;

  > div {
    height: 150px;
  }
`;
