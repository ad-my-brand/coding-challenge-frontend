import React from 'react';
import { render } from '@testing-library/react';
import UserForm from '../src/components/UserForm';

test('renders UserForm component', () => {
    const { getByTestId } = render(<UserForm />);
    const formElement = getByTestId('user-form');
    expect(formElement).toBeInTheDocument();
});
