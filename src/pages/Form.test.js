import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  test('displays error message for invalid submission', async () => {
    render(<Form />);

    fireEvent.click(screen.getByText('Submit'));
    
    const errorMessage = await screen.findByText('Fill all the fields!');
    expect(errorMessage).toBeInTheDocument();

    const errorMessage1 = await screen.findByText('Please select a user.');
    expect(errorMessage1).toBeInTheDocument();

    const errorMessage2 = await screen.findByText('Please enter a title.');
    expect(errorMessage2).toBeInTheDocument();

  });

});
