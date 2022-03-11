import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import empty from '../../../assets/lotties/empty.json';
import { LottieStyle } from '../../../styles/LottieStyle';
import styled from 'styled-components';

const NoneFound: React.FC = ({ children }) => {
  const AnimationRef = useRef<HTMLDivElement>(null as any);
  useEffect(() => {
    Lottie.loadAnimation({
      container: AnimationRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: empty,
    });
  }, []);
  return (
    <AnimationContainer>
      {children}
      <LottieStyle className='none-found' ref={AnimationRef}></LottieStyle>
    </AnimationContainer>
  );
};

export default NoneFound;

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem;
  justify-content: center;
  align-items: center;
`;
