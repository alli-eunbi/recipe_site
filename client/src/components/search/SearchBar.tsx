import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  Ref,
} from 'react';
import Input from '../ui/input/Input';

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  ref: Ref<HTMLInputElement>;
};

const SearchBar: React.FC<Props> = ({
  onChange,
  placeholder,
  ref,
  ...rest
}) => {
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
      ref={ref}
      {...rest}
    />
  );
};

export default SearchBar;
