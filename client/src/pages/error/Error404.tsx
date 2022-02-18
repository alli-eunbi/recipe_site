import React from 'react';
import styled from 'styled-components';

const Error404: React.FC = () => {
  return (
    <ErrorPage>
      <h2>존재하지 않는 페이지입니다.</h2>
    </ErrorPage>
  );
};

export default Error404;

const ErrorPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
