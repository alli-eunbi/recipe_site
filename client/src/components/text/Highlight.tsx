import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  children: any;
  className?: string;
};

export const HighLight: React.FC<Props> = ({ children, className }) => {
  return (
    <HighLightContainer className={className}>{children}</HighLightContainer>
  );
};

const HighLightContainer = styled.span`
  color: darkred;

  &.ingredients {
    font-size: 1.2rem;
    line-height: 3rem;
  }
`;
