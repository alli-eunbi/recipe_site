import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const Navigation: React.FC = () => {
  return (
    <Header>
      <Logo to='/'>
        <span>아이콘 로고</span>
      </Logo>
      <nav>
        <NavLinks />
      </nav>
    </Header>
  );
};

export default Navigation;

const Logo = styled(Link)`
  margin-left: 1rem;
  text-decoration: none;
  color: white;
`;
