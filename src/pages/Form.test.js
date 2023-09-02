import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  test('displays error message for invalid submission', async () => {
    render(<Form />);

    fireEvent.click(screen.getByText('Submit'));
    
    const errorMessage = await screen.findByText('Please select a user.');
    expect(errorMessage).toBeInTheDocument();
  });

  // Write additional tests here
});
