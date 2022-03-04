import React, { useEffect, useRef } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Title } from '../../components/text/Title';
import Lottie from 'lottie-web';
import { LottieStyle } from '../../styles/LottieStyle';
import lottie404 from '../../assets/lotties/lottie404.json';

const Error404: React.FC = () => {
  const AnimationRef = useRef<HTMLDivElement>(null as any);
  useEffect(() => {
    Lottie.loadAnimation({
      container: AnimationRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottie404,
    });
  }, []);
  return (
    <PageLayout>
      <Title>존재하지 않는 페이지입니다.</Title>
      <LottieStyle ref={AnimationRef}></LottieStyle>
    </PageLayout>
  );
};

export default Error404;
