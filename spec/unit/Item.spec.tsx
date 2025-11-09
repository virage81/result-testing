import { render } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { Item } from 'src/components/Item';

describe('Элемент списка задач', () => {
	const userEvent = ue.setup({
		advanceTimers: jest.advanceTimersByTime,
	});

	it('название не должно быть больше 32 символов', () => {
		const onDelete = jest.fn();
		const onToggle = jest.fn();
		const { getByLabelText } = render(
			<Item id='123' header='Заголовок длиной больше, чем 32 символа' done onDelete={onDelete} onToggle={onToggle} />
		);

		const labelEl = getByLabelText('task-name');
		expect(labelEl.textContent).toHaveLength(32);
	});

	it('название не должно быть пустым', () => {
		const onDelete = jest.fn();
		const onToggle = jest.fn();
		const { asFragment } = render(<Item id='123' header='Задача №1' done onDelete={onDelete} onToggle={onToggle} />);
		const item = asFragment();

		expect(item).toMatchSnapshot();
	});

	it('нельзя удалять невыполненные задачи', () => {
		const onDelete = jest.fn();
		const onToggle = jest.fn();
		const { getByRole } = render(
			<Item id='123' header='Задача №1' done={false} onDelete={onDelete} onToggle={onToggle} />
		);

		const button = getByRole('button');

		expect(button).toBeDisabled();
	});

	it('можно удалять выполненные задачи', async () => {
		const onDelete = jest.fn();
		const onToggle = jest.fn();
		const { getByRole } = render(<Item id='123' header='Задача №1' done onDelete={onDelete} onToggle={onToggle} />);

		const button = getByRole('button');

		expect(button).not.toBeDisabled();

		await userEvent.click(button);
		expect(onDelete).toBeCalledTimes(1);
	});

	it('смена статуса задачи', async () => {
		const onDelete = jest.fn();
		const onToggle = jest.fn();
		const { getByRole } = render(<Item id='123' header='Задача №1' done onDelete={onDelete} onToggle={onToggle} />);

		const checkboxEl = getByRole('checkbox');

		await userEvent.click(checkboxEl);
		await userEvent.click(checkboxEl);

		expect(onToggle).toBeCalledTimes(2);
	});
});
