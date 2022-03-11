import React, { ChangeEvent, ChangeEventHandler, useCallback } from 'react';
import Input from '../ui/input/Input';

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

const SearchBar: React.FC<Props> = ({ onChange, placeholder, ...rest }) => {
  const handleChangeSearchInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <Input
      type='text'
      className='search'
      onChange={handleChangeSearchInput}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default SearchBar;
