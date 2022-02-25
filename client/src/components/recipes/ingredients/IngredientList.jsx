import React, { useRef } from 'react';
import styled from 'styled-components';
import Input from '../../input/Input';
import IngredientItem from './IngredientItem';

const IngredientList = (props) => {
  const { list, onChangeList } = props;
  const ingredientRef = useRef();
  const amountRef = useRef();

  const deleteIngredientItem = (event) => {
    if (event.target.dataset.type === 'tagItem') {
      const id = Number(event.target.dataset.id);
      const newTags = list.filter((_, idx) => idx !== id);
      onChangeList(newTags);
    }
  };

  const addIngredientItem = async (event) => {
    if (
      event.key === 'Enter' &&
      ingredientRef.current.value !== '' &&
      amountRef.current.value !== ''
    ) {
      await onChangeList((prev) => {
        const newIngredientTags = [...prev];
        newIngredientTags.push([
          ingredientRef.current.value,
          amountRef.current.value,
        ]);
        return newIngredientTags;
      });
      ingredientRef.current.focus();
      ingredientRef.current.value = '';
      amountRef.current.value = '';
    }
  };

  return (
    <IngredientListContainer onClick={deleteIngredientItem}>
      <h3>{props.text}</h3>
      <form action='' onKeyPress={addIngredientItem}>
        <input type='text' placeholder={props.text} ref={ingredientRef} />
        <input type='text' placeholder='계량' ref={amountRef} />
      </form>
      <TagContainer onClick={deleteIngredientItem}>
        {list.map((value, idx) => (
          <IngredientItem key={idx} id={idx} value={value} />
        ))}
      </TagContainer>
    </IngredientListContainer>
  );
};

export default IngredientList;

const TagContainer = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const IngredientListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > form > input {
    text-align: center;
    width: 100px;
    height: 30px;
    & {
      margin-left: 8px;
    }
  }
`;
