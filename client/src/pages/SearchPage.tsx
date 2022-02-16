import React from 'react';
import styled from 'styled-components';
import CategoryFilter from '../components/category/CategoryFilter';
import Card from '../components/Card';
import SearchForm from '../components/search/SearchForm';
import { HighLight } from '../components/text/Highlight';

const SearchPage: React.FC = () => {
  const cardNum = ['1', '2', '3', '4'];

  if (cardNum.length < 1) {
    return <h2>조건에 맞는 레시피가 존재하지 않습니다.</h2>;
  }
  return (
    <PageWrapper>
      {cardNum.length !== 0 ? (
        <>
          <CategoryFilter />
          <SearchResultWrapper>
            <h2>
              총 <HighLight>{cardNum.length}</HighLight>건의 레시피를
              찾았습니다!
            </h2>
            <RecipeListContainer>
              {cardNum.map((number) => (
                <Card key={number}>{number}</Card>
              ))}
            </RecipeListContainer>
          </SearchResultWrapper>
        </>
      ) : (
        <SearchForm />
      )}
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
  margin: 4rem auto;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  width: fit-content;
`;
