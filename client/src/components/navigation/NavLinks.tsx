import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { authState } from '../../store/store';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

type Props = {
  className: string;
};

const NavLinks: React.FC<Props> = ({ className }) => {
  const [authenticated, setAuthenticated] = useRecoilState(authState);
  const cookie = new Cookies();

  const handleLogout = () => {
    cookie.remove('access_token');
    setAuthenticated(false);
  };

  return (
    <LinkItems className={className}>
      <li>
        <NavLink to='/kind-select'>사진으로 찾기</NavLink>
      </li>
      <li>
        <NavLink to='/word-search'>조건으로 찾기</NavLink>
      </li>
      <li>
        <NavLink to='/guide'>채식 가이드</NavLink>
      </li>
      {authenticated ? (
        <>
          <li>
            <NavLink to='/create-recipe'>레시피 작성</NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>로그아웃</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to='/login'>로그인</NavLink>
          </li>
        </>
      )}
    </LinkItems>
  );
};

export default NavLinks;

const LinkItems = styled.ul`
  &.regular {
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
      background-color: #78b075;
      border-radius: 4px;
      text-decoration: none;
      word-break: keep-all;
      padding: 0.5rem 0.5rem;
      font-size: 1.05rem;

      &:hover {
        transition: 100ms ease-out;
        background-color: green;
      }

      @media (max-width: 900px) {
        padding: 2px;
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    & li > button {
      color: white;
      background-color: #78b075;
      border-radius: 4px;
      border: none;
      font-size: 1rem;
      text-decoration: none;
      word-break: keep-all;
      padding: 0.5rem 0.5rem;
      cursor: pointer;

      &:hover {
        transition: 100ms ease-out;
        background-color: green;
      }

      @media (max-width: 900px) {
        padding: 2px;
      }
    }
  }

  &.side-drawer {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & li {
      margin: 0.5rem;
    }

    & li > a {
      color: #78b075;
      border-radius: 4px;
      text-decoration: none;
      word-break: keep-all;
      padding: 0.5rem 0.5rem;
      font-size: 1.05rem;

      &:hover {
        transition: 100ms ease-out;
        padding: 0.5rem 0.5rem;
        color: white;
        background-color: green;
      }

      @media (max-width: 900px) {
        padding: 2px;
      }
    }

    & li > button {
      color: white;
      background-color: #78b075;
      border-radius: 4px;
      border: none;
      font-size: 1rem;
      text-decoration: none;
      word-break: keep-all;
      padding: 0.5rem 0.5rem;
      cursor: pointer;

      &:hover {
        transition: 100ms ease-out;
        background-color: green;
      }

      @media (max-width: 900px) {
        padding: 2px;
      }
    }
  }
`;
