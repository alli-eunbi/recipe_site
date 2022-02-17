import React from 'react';
import styled from 'styled-components';

const AboutPage: React.FC = () => {
  return (
    <AboutTemplate>
      <h2>채식</h2>
      <p>건강한 채식을 할 수 있는 방법 소개</p>
    </AboutTemplate>
  );
};

export default AboutPage;

const AboutTemplate = styled.main`
  margin-top: 10rem;
  height: 100vh;
  width: 100vw;
`;
