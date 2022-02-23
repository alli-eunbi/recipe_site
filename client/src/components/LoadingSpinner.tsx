import React from 'react';
import LottieLoader from 'react-lottie-loader';
import Lottie from '../assets/lotties/walking-broccoli.json';

const LoadingSpinner: React.FC = () => {
  return <LottieLoader animationData={Lottie} />;
};

export default LoadingSpinner;
