import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import styled, { css } from 'styled-components';

type StyleProps = {
  visible: boolean;
};

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <ScrollImage
      src='/images/scroll-to-top.png'
      alt='위로'
      visible={visible}
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollTopButton;

const ScrollImage = styled.img`
  width: 2.5rem;
  display: ${({ visible }: StyleProps) => (visible ? 'inline' : 'none')};
  position: fixed;
  top: 85%;
  left: 94%;
  cursor: pointer;
`;
