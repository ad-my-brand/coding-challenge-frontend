import { render, screen } from '@testing-library/react';
import FormControl from './FormControl.js';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    render(<FormControl />)

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});