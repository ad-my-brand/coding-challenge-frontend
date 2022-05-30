import { createContext, useCallback, useReducer } from 'react';

const errorsInitialState = {
  user: true,
  title: true,
  body: true,
};

const errorReducer = (state, action) => {
  if (action.type === 'USER') {
    return { ...state, user: action.payload };
  }

  if (action.type === 'TITLE') {
    return { ...state, title: action.payload };
  }

  if (action.type === 'BODY') {
    return { ...state, body: action.payload };
  }

  return errorInitialState;
};

const ErrorContext = createContext(errorsInitialState);

const ErrorProvider = ({ children }) => {
  const [errors, errorDispatch] = useReducer(errorReducer, errorsInitialState);

  const setUserError = useCallback(err => {
    errorDispatch({ type: 'USER', payload: err });
  }, []);

  const setTitleError = useCallback(err => {
    errorDispatch({ type: 'TITLE', payload: err });
  }, []);

  const setBodyError = useCallback(err => {
    errorDispatch({ type: 'BODY', payload: err });
  }, []);

  return (
    <ErrorContext.Provider
      value={{
        errors,
        setUserError,
        setTitleError,
        setBodyError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext as default, ErrorProvider };
