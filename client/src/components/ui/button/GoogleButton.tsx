import React from 'react';
import styled from 'styled-components';
import { googleRequestUrl } from '../../../api/user';

const GoogleButton: React.FC = () => {
  return (
    <a href={googleRequestUrl}>
      <ButtonContainer src='/images/oath/google_login.png' alt='google-login' />
    </a>
  );
};

export default GoogleButton;

const ButtonContainer = styled.img`
  transform: scale(1.11);
`;
