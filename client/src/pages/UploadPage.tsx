import styled from 'styled-components';
import { PageLayout } from '../components/layout/PageLayout';
import PhotoSearchUploader from '../components/search/PhotoSearchUploader';
import { HighLight } from '../components/text/Highlight';

const UploadPage = () => {
  return (
    <PageLayout>
      <Header>
        <h1>재료 사진 업로드</h1>
        <Instruction>
          가지고 계신 식재료들을 가지런히 하여,{' '}
          <HighLight>한장의 사진</HighLight>에 담아주세요!
        </Instruction>
        <Instruction>
          정확한 결과를 위해, 재료는 약간 떨어뜨려 주세요.
        </Instruction>
      </Header>
      <PhotoSearchUploader />
    </PageLayout>
  );
};

export default UploadPage;

const Header = styled.header`
  margin: 3rem auto;

  & > h1,
  p {
    text-align: center;
  }

  & > h1 {
    margin-bottom: 1rem;
  }
`;

const Instruction = styled.p`
  font-size: 1.2rem;
`;
