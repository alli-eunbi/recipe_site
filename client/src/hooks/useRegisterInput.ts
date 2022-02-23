import { ChangeEvent, useState } from 'react';

const useRegisterInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValid = validateValue(enteredValue);
  const hasError = !isInputValid && isInputTouched;

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsInputTouched(true);
  };

  const handleReset = () => {
    setEnteredValue('');
    setIsInputTouched(false);
  };

  return {
    value: enteredValue,
    isInputValid,
    hasError,
    handleValueChange,
    handleInputBlur,
    handleReset,
  };
};

export default useRegisterInput;
