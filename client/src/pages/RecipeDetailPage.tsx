import styled from 'styled-components';
import { PageLayout } from '../components/layout/PageLayout';

const RecipeDetailPage = () => {
  return (
    <PageLayout>
      <DetailContainer>안녕</DetailContainer>
    </PageLayout>
  );
};

export default RecipeDetailPage;

const DetailContainer = styled.div`
  margin-top: 3rem;
  height: fit-content;
  width: 60rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
