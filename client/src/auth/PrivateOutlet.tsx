import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authAtom } from '../store/store';
import { useRecoilValue } from 'recoil';

const PrivateOutlet: React.FC = () => {
  const authenticated = useRecoilValue(authAtom);
  return authenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateOutlet;
