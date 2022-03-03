import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import HeaderLogo from './HeaderLogo';

const Navigation: React.FC = () => {
  return (
    <Header>
      <HeaderLogo />
      <nav>
        <NavLinks />
      </nav>
    </Header>
  );
};

export default Navigation;
