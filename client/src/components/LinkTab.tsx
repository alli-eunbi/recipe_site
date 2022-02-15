import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type IProps = {
  children: string;
  destination: string;
};

const LinkTab: React.FC<IProps> = (props) => {
  return <Link to={props.destination}>{props.children}</Link>;
};
export default LinkTab;

const LinkTabContainer = styled(Link)`
  
`;