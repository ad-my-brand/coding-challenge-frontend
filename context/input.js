import { createContext, useCallback, useReducer } from 'react';

const inputValuesInitialState = {
  title: '',
  body: '',
};

const inputValuesReducer = (state, action) => {
  if (action.type === 'TITLE') {
    return { ...state, title: action.payload };
  }

  if (action.type === 'BODY') {
    return { ...state, body: action.payload };
  }

  return inputValuesInitialState;
};

const InputContext = createContext(inputValuesInitialState);

const InputProvider = ({ children }) => {
  const [inputValues, inputValuesDispatch] = useReducer(
    inputValuesReducer,
    inputValuesInitialState
  );

  const setTitle = useCallback(value => {
    inputValuesDispatch({ type: 'TITLE', payload: value });
  }, []);

  const setBody = useCallback(value => {
    inputValuesDispatch({ type: 'BODY', payload: value });
  }, []);

  return (
    <InputContext.Provider
      value={{
        inputValues,
        setTitle,
        setBody,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export { InputContext as default, InputProvider };
