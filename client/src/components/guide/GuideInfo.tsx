import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  descriptions: string[];
  answers: string[];
  url: string;
};

const GuideInfo: React.FC<Props> = ({ title, descriptions, answers, url }) => {
  return (
    <>
      <h3>{title}</h3>
      {descriptions.map((description) => (
        <p>{description}</p>
      ))}
      <GuideInfoContainer>
        <div></div>
        <GuideTextArea>
          {answers.map((item) => (
            <Answer>{item}</Answer>
          ))}
          {url && (
            <a href={url} target='_blank' rel='noreferrer'>
              <img src='/images/guide/vegefood_logo.png' alt='vegefood_logo' />
            </a>
          )}
        </GuideTextArea>
      </GuideInfoContainer>
    </>
  );
};

export default GuideInfo;

const GuideInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const GuideTextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Answer = styled.p`
  word-break: keep-all;
  line-height: 1.5rem;
`;
