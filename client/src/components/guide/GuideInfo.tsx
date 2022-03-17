import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  id: string;
  descriptions: string[];
  categories: string[];
  answers: string[];
  url: string;
};

type StyleProps = {
  id: string;
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
        <GuideBackground
          id={id}
          src={`/images/guide/${id}_main.png`}
          alt={id}
        />
        <GuideTextArea id={id}>
          {answers.map((item, idx) => (
            <>
              {categories ? (
                <Answer key={categories[idx]}>
                  <AnswerCategory>{categories[idx]}: </AnswerCategory>
                  {item}
                </Answer>
              ) : (
                <Answer key={item}>{item}</Answer>
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
    color: green;
  }

  margin-bottom: 1.5rem;
`;

const GuideInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const GuideTextArea = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 1rem;
  overflow: scroll;
  height: ${({ id }: StyleProps) =>
    id === 'q1'
      ? '480px'
      : id === 'q3' || id === 'q4'
      ? '480px'
      : id === 'q2'
      ? '500px'
      : id === 'q5'
      ? '480px'
      : id === 'q6'
      ? '520px'
      : '500px'};
  margin: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  background-size: contain;
  object-fit: contain;

  > a {
    margin-top: 10rem;
  }

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

const GuideBackground = styled.img`
  border-radius: 8px;
  width: ${({ id }: StyleProps) => (id === 'q1' ? '600px' : '320px')};
  object-fit: contain;

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

const Answer = styled.p`
  word-break: keep-all;
  text-align: left;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

const AnswerCategory = styled.p`
  color: green;
`;
