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
  padding: 0 5rem;
  top: 0;
  left: 0;
  height: 5rem;
  width: 100%;
  background-color: #78b075;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;
