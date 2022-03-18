import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import Modal from '../ui/modal/Modal';
import GuideInfo from './GuideInfo';

type StyleProps = {
  id: string;
};

type Props = {
  question: string;
  title: string;
  descriptions: string[];
  categories: string[];
  answers: string[];
  url: string;
  id: string;
};

const GuideCard: React.FC<Props> = ({
  title,
  question,
  descriptions,
  categories,
  answers,
  url,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          invalid={true}
          className='guide'
          onConfirm={handleCloseModal}
          onCancel={handleCloseModal}
        >
          <GuideInfo
            id={id}
            title={title}
            descriptions={descriptions}
            categories={categories}
            answers={answers}
            url={url}
          />
        </Modal>
      )}
      <GuideCardContainer onClick={handleOpenModal} id={id}>
        <GuidePreviewImage id={id} />
        <figcaption>{question}</figcaption>
      </GuideCardContainer>
    </>
  );
};

export default GuideCard;

const GuidePreviewImage = styled.div`
  border-radius: 8px 8px 0 0;
  width: 22rem;
  height: 15rem;
  ${({ id }: StyleProps) => css`
    background-image: url('/images/guide/${id}_cover.jpg');
  `}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const GuideCardContainer = styled.div`
  width: 22rem;
  height: 16rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: 200ms ease-in-out;

  &:hover {
    transform: scale(1.03);
    opacity: 0.85;
    cursor: pointer;
  }

  & > figcaption {
    font-size: 1.1rem;
    text-align: center;
    margin: 0.5rem;
    color: black;
  }
`;
