import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from '../store/store';
import { useRecoilValue } from 'recoil';

const PrivateOutlet: React.FC = () => {
  const authenticated = useRecoilValue(authState);
  return authenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateOutlet;
