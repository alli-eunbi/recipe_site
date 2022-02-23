import GoogleLogin from 'react-google-login';
import React from 'react';

const GoogleButton: React.FC = () => {
  return (
    <GoogleLogin clientId={`${process.env.GOOGLE_CLIENT_ID}`}></GoogleLogin>
  );
};

export default GoogleButton;
