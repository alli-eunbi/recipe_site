import styled from 'styled-components';
import GuideCard from './GuideCard';
import { questions } from '../../assets/data/guide';

const GuideCardList = () => {
  return (
    <GuideCardListContainer>
      {questions.map((item: any) => (
        <GuideCard
          key={item.id}
          id={item.id}
          title={item.title}
          descriptions={item.descriptions}
          categories={item.categories}
          answers={item.answers}
          question={item.question}
          url={item.url}
        />
      ))}
    </GuideCardListContainer>
  );
};

export default GuideCardList;

const GuideCardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
