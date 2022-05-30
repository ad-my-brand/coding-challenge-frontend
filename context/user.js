import { createContext, useCallback, useReducer } from 'react';

const userInitialState = { show: false, user: null };

const UserContext = createContext(userInitialState);

const userReducer = (state, action) => {
  if (action.type === 'TOGGLE') {
    return { ...state, show: !state.show };
  }

  if (action.type === 'HIDE') {
    return { ...state, show: false };
  }

  if (action.type === 'CHANGE_USER') {
    return { ...state, user: action.payload };
  }

  return userInitialState;
};

const UserProvider = ({ children }) => {
  const [selectUser, dispatch] = useReducer(userReducer, userInitialState);

  const toggle = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  const hide = useCallback(() => {
    dispatch({ type: 'HIDE' });
  }, []);

  const changeUser = useCallback(user => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  }, []);

  return (
    <UserContext.Provider
      value={{
        selectUser,
        toggle,
        hide,
        changeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext as default, UserProvider };
