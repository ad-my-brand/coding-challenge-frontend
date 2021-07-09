import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import FormControl from '../components/FormControl';
afterEach(cleanup);

it('renders correctly', () => {
  const { getByTestId } = render(<FormControl />);
  expect(getByTestId('submitBTn')).toBeEnabled();
});

describe('onChange event for title', () => {
  it('onChange with values', () => {
    const { getByTestId } = render(<FormControl />);
    const titleInput = getByTestId('title');
    act(() => {
      fireEvent.change(titleInput, { target: { value: 'test' } });
    });
    expect(titleInput.value).toBe('test');
  });
});

describe('Onchange event for body', () => {
  it('onChange with values', () => {
    const { getByTestId } = render(<FormControl />);
    const bodyInput = getByTestId('body');
    act(() => {
      fireEvent.change(bodyInput, { target: { value: 'test' } });
    });
    expect(bodyInput.value).toBe('test');
  });
});
