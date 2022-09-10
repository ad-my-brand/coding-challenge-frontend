import App, { url } from '../App';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('axios');

describe('App', () => {
	beforeEach(() => jest.clearAllMocks());
	it('render component', async () => {
		const users = [
			{
				id: 1,
				name: 'Leanne Graham',

				address: {
					street: 'Kulas Light',
					suite: 'Apt. 556',
					city: 'Gwenborough',
					zipcode: '92998-3874',
					geo: {
						lat: '-37.3159',
						lng: '81.1496',
					},
				},
			},
		];

		axios.get.mockResolvedValueOnce(users);
		const result = await axios.get(url);

		expect(axios.get).toHaveBeenCalledWith(url);
		expect(result).toEqual(users);
	});
});
