import React from 'react';
import styled from 'styled-components';
import { googleRequestUrl } from '../../api/user';

const GoogleButton: React.FC = () => {
  return (
    <a href={googleRequestUrl}>
      <img src='images/google_login.png' />
    </a>
  );
};

export default GoogleButton;
