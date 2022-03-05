import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authAtom } from '../store/store';
import { useRecoilValue } from 'recoil';
import Cookies from 'universal-cookie';

const PrivateOutlet: React.FC = () => {
  const authenticated = useRecoilValue(authAtom);
  const cookie = new Cookies();
  return authenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateOutlet;
