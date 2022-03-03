import React from 'react';
import Header from './Header';
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
