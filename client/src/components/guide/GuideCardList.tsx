import styled from 'styled-components';
import GuideCard from './GuideCard';
import { questions } from '../../assets/data/guide';

const GuideCardList = () => {
  return (
    <GuideCardListContainer>
      {questions.map((item: any) => (
        <GuideCard key={item.id} id={item.id} question={item.question} />
      ))}
    </GuideCardListContainer>
  );
};

export default GuideCardList;

const GuideCardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
