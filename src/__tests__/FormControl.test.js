import { render, screen, fireEvent } from '@testing-library/react';
import FormControl from '../components/FormControl';

const mockFunc = jest.fn();

describe('Form Control test', () => {
	it('render Form control', async () => {
		render(<FormControl setName={mockFunc} />);
		const nameInput = screen.getByPlaceholderText(/Name/i);
		expect(nameInput).toBeInTheDocument();
	});

	it('change input value', async () => {
		render(<FormControl setName={mockFunc} />);
		const nameInput = screen.getByPlaceholderText(/Name/i);

		fireEvent.change(nameInput, { target: { value: 'hello world' } });
		expect(nameInput.value).toBe('hello world');
	});
});
