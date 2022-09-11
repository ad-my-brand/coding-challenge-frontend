import Home from '../pages/index';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Home', () => {
	it('checks the heading', () => {
		render(<Home />);
		expect(screen.getByText('Welcome')).toBeInTheDocument();
		expect(
			screen.getByText('Check out the user details form')
		).toBeInTheDocument();
	});
});
