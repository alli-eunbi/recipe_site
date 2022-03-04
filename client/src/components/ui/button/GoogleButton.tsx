import React from 'react';
import { googleRequestUrl } from '../../../api/user';

const GoogleButton: React.FC = () => {
  return (
    <a href={googleRequestUrl}>
      <img src='images/google_login.png' alt='google-login' />
    </a>
  );
};

export default GoogleButton;
