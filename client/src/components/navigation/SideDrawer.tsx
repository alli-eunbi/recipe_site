import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import React from 'react';

type Props = {
  isShowing: boolean;
  onClick: () => void;
};

const SideDrawer: React.FC<Props> = ({ isShowing, onClick, children }) => {
  const sideDrawerPortal = document.getElementById('side-drawer');

  const content = (
    <CSSTransition
      in={isShowing}
      timeout={200}
      classNames='slide-in-right'
      mountOnEnter
      unmountOnExit
    >
      <SideDrawerContainer onClick={onClick}>{children}</SideDrawerContainer>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, sideDrawerPortal as Element);
};

export default SideDrawer;

const SideDrawerContainer = styled.aside`
  position: fixed;
  right: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;
