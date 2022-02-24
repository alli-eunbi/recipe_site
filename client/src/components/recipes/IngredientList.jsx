import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import IngredientItemInput from './IngredientItemInput';

const IngredientList = () => {
  const [ingredientTags, setIngredientTags] = useState([]);
  const ingredientRef = useRef();
  const amountRef = useRef();

  const deleteIngredientItem = (event) => {
    return;
  };
  const addIngredientItem = (event) => {
    if (event.key === 'Enter') {
      setIngredientTags((prev) => {
        const newIngredientTags = [...prev];
        const ingredientObj = new Object();
        ingredientObj[ingredientRef.current.value] = amountRef.current.value;
        newIngredientTags.push(ingredientObj);
        return newIngredientTags;
      });
    }
    ingredientRef.current.focus();
  };

  console.log(ingredientTags);

  return (
    <IngredientListContainer onClick={deleteIngredientItem}>
      <form action='' onKeyPress={addIngredientItem}>
        <input type='text' placeholder='재료' ref={ingredientRef} />
        <input type='text' placeholder='계량' ref={amountRef} />
      </form>
    </IngredientListContainer>
  );
};

export default IngredientList;

const IngredientListContainer = styled.div`
  display: flex;
  list-style: none;
`;
