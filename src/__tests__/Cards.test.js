import { render, screen, fireEvent } from '@testing-library/react';

import Cards from '../components/Cards';

const mockData = [
	{
		id: 1,
		name: 'Leanne Graham',
	},
];

describe('Cards component', () => {
	it('render cards component', async () => {
		render(<Cards data={mockData} />);
	});
	it('types input value', async () => {
		render(<Cards data={mockData} />);
		const titleInput = await screen.findByPlaceholderText(/title/i);
		const bodyInput = await screen.findByPlaceholderText(/body/i);

		fireEvent.change(titleInput, { target: { value: 'hello title' } });
		fireEvent.change(bodyInput, { target: { value: 'hello body' } });
		expect(titleInput.value).toBe('hello title');
		expect(bodyInput.value).toBe('hello body');
	});
	it('submit button', async () => {
		render(<Cards data={mockData} />);
		const buttonHandler = await screen.findByText(/submit/i);
		expect(buttonHandler).toBeInTheDocument();
	});
});
