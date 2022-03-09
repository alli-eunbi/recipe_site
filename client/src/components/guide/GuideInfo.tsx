import React from 'react';
import styled, { css } from 'styled-components';

type StyleProps = {
  id: string;
};

type Props = {
  title: string;
  id: string;
  descriptions: string[];
  categories: string[];
  answers: string[];
  url: string;
};

const GuideInfo: React.FC<Props> = ({
  id,
  title,
  descriptions,
  categories,
  answers,
  url,
}) => {
  return (
    <>
      <GuideHeader>
        <h3>{title}</h3>
        {descriptions.map((description) => (
          <p>{description}</p>
        ))}
      </GuideHeader>
      <GuideInfoContainer>
        <GuideBackground id={id} />
        <GuideTextArea>
          {answers.map((item, idx) => (
            <>
              {categories ? (
                <Answer>
                  <span>{categories[idx]}: </span>
                  {item}
                </Answer>
              ) : (
                <Answer>{item}</Answer>
              )}
            </>
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

const GuideHeader = styled.div`
  word-break: keep-all;

  > h3 {
    margin-bottom: 1rem;
  }

  margin-bottom: 1.5rem;
`;

const GuideInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const GuideTextArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuideBackground = styled.div`
  ${({ id }: StyleProps) => css`
    background-image: url(/images/guide/${id}_main.png);
  `}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  width: 28rem;
  height: 22rem;
`;

const Answer = styled.p`
  word-break: keep-all;
  text-align: left;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;
