import React, { useState } from 'react';
import Header from './Header';
import NavLinks from './NavLinks';
import HeaderLogo from './HeaderLogo';
import BackDrop from '../ui/modal/BackDrop';
import SideDrawer from './SideDrawer';
import styled from 'styled-components';

const Navigation: React.FC = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const handleOpenSideDrawer = () => {
    setIsSideDrawerOpen(true);
  };

  const handleCloseSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };
  return (
    <>
      {isSideDrawerOpen && <BackDrop onCancel={handleCloseSideDrawer} />}
      <SideDrawer isShowing={isSideDrawerOpen} onClick={handleCloseSideDrawer}>
        <NavLinks className='side-drawer' />
      </SideDrawer>
      <Header>
        <HeaderLogo />
        <nav>
          <NavLinks className='regular' />
        </nav>
        <SideBarButton
          src='images/sidebar/sidebar-button.png'
          alt='side-bar-button'
          onClick={handleOpenSideDrawer}
        ></SideBarButton>
      </Header>
    </>
  );
};

export default Navigation;

const SideBarButton = styled.img`
  cursor: pointer;
  width: 40px;
  @media (min-width: 768px) {
    display: none;
  }
`;
