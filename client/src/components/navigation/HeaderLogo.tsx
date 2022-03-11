import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Logo to='/'>
      <img src='/images/header/vegan_logo.svg' alt='logo' />
      <span>채愛레시피</span>
    </Logo>
  );
};

export default HeaderLogo;

const Logo = styled(Link)`
  margin-left: 1rem;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  width: 12rem;

  & > img {
    height: 3rem;
  }

  & > span {
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
