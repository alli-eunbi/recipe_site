import { useCallback } from 'react';

const useValidate = useCallback(
  (exp: RegExp, value: string, message: string) => {
    const initialState = {
      message: '',
    };
    if (exp.test(value)) {
      return true;
    }
  },
  []
);

export default useValidate;
