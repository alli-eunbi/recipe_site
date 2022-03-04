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
  value: string;
  ref: Ref<HTMLInputElement>;
};

const SearchBar: React.FC<Props> = ({
  onChange,
  placeholder,
  value,
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
      value={value}
      ref={ref}
      {...rest}
    />
  );
};

export default SearchBar;
