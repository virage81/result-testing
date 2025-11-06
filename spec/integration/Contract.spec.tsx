import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { App } from 'src/App';
import { store } from 'src/store/configureStore';
import { tasksSelector } from 'src/store/taskSlice';

const userEvent = ue.setup({
	advanceTimers: jest.advanceTimersByTime,
});

it('проверка контракта', async () => {
	render(<App />);

	const inputEl = screen.getByRole('textbox');
	const addBtnEl = screen.getByAltText(/Добавить/i);

	await userEvent.clear(inputEl);
	await userEvent.type(inputEl, 'Первый заголовок');
	await userEvent.click(addBtnEl);

	await userEvent.type(inputEl, 'Второй заголовок');
	await userEvent.click(addBtnEl);

	const state = store.getState();

	expect(tasksSelector(state)).toContainEqual({
		id: expect.any(String),
		header: expect.any(String),
		done: expect.any(Boolean),
	});
});
