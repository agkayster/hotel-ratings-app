import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import Client from './components/Client';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/Hello/i);
	expect(linkElement).toBeInTheDocument();
});

it('Check select render', () => {
	const { queryByTitle } = render(<Client />);
	const select = queryByTitle('selectHotels');
	expect(select).toBeTruthy();
});

test('simulates selection from option', () => {
	const { getByTestId, getAllByTestId } = render(<Client />);
	const selectOption = getByTestId('select');
	fireEvent.change(selectOption, { target: { value: 0 } });
	let options = getAllByTestId('select-option');
	console.log('options', options);
	expect(options[0].selected).toBeTruthy();
	expect(options[1].selected).toBeFalsy();
	expect(options[2].selected).toBeFalsy();
});

// describe('simulate selection from option', () => {
// 	it('onChange', () => {
// 		const { getByTestId, getAllByTestId } = render(<Client />);
// 		const selectOption = getByTestId('select');
// 		fireEvent.change(selectOption, { target: { value: 'LONTOW' } });
// 		expect(selectOption.value).toBe('LONTOW');
// 	});
// });
