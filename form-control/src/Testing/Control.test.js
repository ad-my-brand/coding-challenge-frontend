import React from 'react';
import '@testing-library/jest-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Control from '../components/Control';
import reducer from '../reducer';
import thunk from 'redux-thunk';
const middleware = [thunk];
afterEach(cleanup);
function renderwithRedux(
  component,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(...middleware)),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

it('renders correctly', () => {
  const { getByTestId } = renderwithRedux(<Control />);
  expect(getByTestId('submit-btn')).toBeEnabled();
});

describe('Post Title Field on Change', () => {
  it('Post Title Field on Submit', () => {
    const { getByTestId } = renderwithRedux(<Control />);
    const titleInput = getByTestId('title');
    fireEvent.change(titleInput, { target: { value: 'test' } });
    expect(titleInput.value).toBe('test');
  });
});
describe('Post Body Field on Change', () => {
  it('updates on change', () => {
    const { getByTestId } = renderwithRedux(<Control />);
    const bodyInput = getByTestId('body');
    fireEvent.change(bodyInput, { target: { value: 'test' } });
    expect(bodyInput.value).toBe('test');
  });
});
describe(' Field on Submit', () => {
  it('values on submit', () => {
    const { getByTestId } = renderwithRedux(<Control />);
    const submit = getByTestId('submit-btn');
    const bodyInput = getByTestId('body');
    const titleInput = getByTestId('title');

    fireEvent.change(bodyInput, { target: { value: 'test' } });
    fireEvent.change(titleInput, { target: { value: 'test' } });

    fireEvent.click(submit);
    expect(bodyInput.value).toBe('test');
    expect(titleInput.value).toBe('test');
  });
});
