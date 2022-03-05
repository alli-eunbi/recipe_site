import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Logo to='/'>
      <img src='images/vegan_logo.svg' alt='logo' />
      <span>한컷한상</span>
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
  width: 10rem;

  & > img {
    height: 3rem;
  }

  & > span {
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }
`;
