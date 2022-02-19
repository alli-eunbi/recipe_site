import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavLinks: React.FC = () => {
  return (
    <LinkItems>
      <li>
        <NavLink to='/upload'>사진으로 찾기</NavLink>
      </li>
      <li>
        <NavLink to='/search'>조건별 찾기</NavLink>
      </li>
      <li>
        <NavLink to='/recipe-book'>레시피 북</NavLink>
      </li>
      <li>
        <NavLink to='/about'>서비스 안내</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>로그인</NavLink>
      </li>
    </LinkItems>
  );
};

export default NavLinks;

const LinkItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & li {
    margin: 0.5rem;
  }

  & li > a {
    color: white;
    background-color: #89c53f;
    border-radius: 4px;
    text-decoration: none;
    word-break: keep-all;
    padding: 0.5rem 0.5rem;

    &:hover {
      transition: 100ms ease-out;
      background-color: green;
    }

    @media (max-width: 717px) {
      padding: 2px;
    }
  }
`;
