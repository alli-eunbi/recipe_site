import React from 'react';
import styled from 'styled-components';

type HeaderProps = {
  children: JSX.Element | JSX.Element[];
};

const Header: React.FC<HeaderProps> = (props) => {
  return <HeaderContainer>{props.children}</HeaderContainer>;
};

export default Header;

const HeaderContainer = styled.header`
  top: 0;
  left: 0;
  height: 5rem;
  width: 100%;
  align-items: center;
  background-color: #265211;
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 10;

  &: @media (min-width: 768px) {
    .main-header {
      justify-content: space-between;
    }
  }
`;
