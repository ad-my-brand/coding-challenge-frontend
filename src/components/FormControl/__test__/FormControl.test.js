import { fireEvent, render } from '@testing-library/react';
import FormControl from '../FormControl';

test('render label properly', () => {
  const { getByTestId } = render(<FormControl label="Title" />);
  const labelElement = getByTestId('label');

  expect(labelElement.textContent).toBe('Title');
});

test('render input text component properly', () => {
  const { getByTestId } = render(<FormControl name="title" />);
  const inputElement = getByTestId('input');

  expect(inputElement.placeholder).toBe('Enter title');
});

test('check if input is typable', () => {
  const { getByTestId } = render(<FormControl name="title" />);
  const inputElement = getByTestId('input');

  expect(inputElement.value).toBe('');

  fireEvent.change(inputElement, { target: { value: 'this is a test' } });

  expect(inputElement.value).toBe('this is a test');
});
