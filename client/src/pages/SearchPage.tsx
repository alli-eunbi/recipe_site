import React from 'react';
import styled from 'styled-components';
import Category from '../components/category/Category';
import Card from '../components/Card';
import SearchForm from '../components/search/SearchForm';
import { HighLight } from '../components/text/Highlight';

const SearchPage: React.FC = () => {
  const cardNum = ['1', '2', '3', '4', '5', '6', '7', '8'];

  if (cardNum.length < 1) {
    return <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>;
  }
  return (
    <PageWrapper>
      <>
        <Category />
        <SearchResultWrapper>
          <h2>
            총 <HighLight>{cardNum.length}</HighLight>건의 레시피를 찾았습니다!
          </h2>
          <hr />
          <RecipeListContainer>
            {cardNum.map((number) => (
              <Card key={number}>{number}</Card>
            ))}
          </RecipeListContainer>
        </SearchResultWrapper>
      </>
    </PageWrapper>
  );
};

export default SearchPage;

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchResultWrapper = styled.div`
  margin: 4rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  width: fit-content;
`;

const RecipeListContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 1rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  width: fit-content;

  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 970px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
