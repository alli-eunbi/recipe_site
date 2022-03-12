import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  name: string;
  onSelectOption: (value: string) => void;
  image: string;
  alt: string;
  option: string;
};

type StyleProps = {
  checked: boolean;
};

const Icon: React.FC<Props> = ({
  name,
  onSelectOption,
  image,
  alt,
  option,
}) => {
  const handleSelectKind: MouseEventHandler<HTMLDivElement> = (e: any) => {
    onSelectOption(e.target.id);
  };
  return (
    <OptionIcon
      id={name}
      data-type='IconItem'
      onClick={handleSelectKind}
      checked={option === name}
    >
      <IconImage id={name} data-type='IconItem' src={image} alt={alt} />
      <p id={name} data-type='IconItem'>
        {name}
      </p>
    </OptionIcon>
  );
};

export default Icon;

const IconImage = styled.img`
  width: 40px;
`;

const OptionIcon = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: green;
  cursor: pointer;
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 200ms ease-out;

  ${({ checked }: StyleProps) =>
    checked &&
    css`
      border: 0.5rem #78b075 solid;
    `}

  > p {
    font-size: 15px;
    color: white;
  }

  & > span {
    position: absolute;
    background-color: white;
    border-radius: 4px;
    padding: 0.5rem;
    display: none;
    margin-top: 1rem;
  }

  &:hover {
    & + span {
      display: inline;
    }
  }

  &:active {
    opacity: 0.2;
  }
`;
