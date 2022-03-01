import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const Navigation: React.FC = () => {
  return (
    <Header>
      <Logo to='/'>
        <img src='/images/vegan_logo.svg' alt='logo' />
        <span>한컷한상</span>
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
  display: flex;
  align-items: center;

  & > img {
    height: 3rem;
  }

  & > span {
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }
`;
