import { render } from '@testing-library/react';
import { List } from 'src/components/List';

test('отображение списка задач', () => {
	const onDelete = jest.fn();
	const onToggle = jest.fn();

	const items: Task[] = [
		{
			id: '1',
			header: 'купить хлеб',
			done: false,
		},
		{
			id: '2',
			header: 'купить молоко',
			done: false,
		},
		{
			id: '3',
			header: 'выгулять собаку',
			done: true,
		},
	];

	const { rerender, asFragment } = render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
	const firstRender = asFragment();

	items.pop();

	rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
	const secondRender = asFragment();

	expect(firstRender).toMatchDiffSnapshot(secondRender);
});

test('Список содержит не больше 10 невыполненных задач', () => {
	const onDelete = jest.fn();
	const onToggle = jest.fn();

	const baseItemNames = ['Купить хлеб', 'Купить молоко', 'Выгулять собаку'];
	const items = Array.from<Task>({ length: 11 }).map((item, i) => {
		return {
			id: String(i + 1),
			header: `${baseItemNames[i % 3]}${i >= 3 ? ` #${Math.floor(i / 3) + 1}` : ''}`,
			done: false,
		};
	});

	const { getByLabelText } = render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
	const listNotificationEl = getByLabelText('list-notification');

	expect(listNotificationEl).not.toHaveTextContent('');
});
