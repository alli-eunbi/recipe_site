import React, {
  MutableRefObject,
  useRef,
  Dispatch,
  MouseEventHandler,
  KeyboardEventHandler,
} from 'react';
import styled from 'styled-components';
import Button from '../../ui/button/Button';
import IngredientItem from './IngredientTag';

type Props = {
  list: any;
  text: string;
  onChangeList: Dispatch<React.SetStateAction<never[] | any>>;
};

const IngredientTagList: React.FC<Props> = ({ list, text, onChangeList }) => {
  const ingredientRef = useRef() as MutableRefObject<HTMLInputElement>;
  const amountRef = useRef() as MutableRefObject<HTMLInputElement>;

  const deleteIngredientItem: MouseEventHandler = (event) => {
    if (event !== null && event.target instanceof HTMLElement) {
      const element = event.target;
      if (element.dataset.type === 'tagItem') {
        const id = Number(element.dataset.id);
        const newTags = list.filter((_: string, idx: number) => idx !== id);
        onChangeList(newTags);
      }
    }
  };

  const addIngredientItem: KeyboardEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (
      e.key === 'Enter' &&
      ingredientRef.current.value !== '' &&
      amountRef.current.value !== ''
    ) {
      await onChangeList((prev: any[]) => {
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

  const addIngredientWithButton: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if (ingredientRef.current.value !== '' && amountRef.current.value !== '') {
      await onChangeList((prev: any[]) => {
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
      <form onKeyPress={addIngredientItem}>
        <input type='text' placeholder={text} ref={ingredientRef} />
        <input type='text' placeholder='계량' ref={amountRef} />
        <Button className='add-tag' onClick={addIngredientWithButton}>
          추가
        </Button>
      </form>
      <TagContainer onClick={deleteIngredientItem}>
        {list.map((value: string, idx: string) => (
          <IngredientItem key={idx} id={idx} value={value} />
        ))}
      </TagContainer>
    </IngredientListContainer>
  );
};

export default IngredientTagList;

const TagContainer = styled.div`
  margin-top: 0.5rem;
  display: grid;
  width: 100%;
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
