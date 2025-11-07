import { useEffect, useState } from 'react';
import { Item } from './Item';

type Props = {
	items: Task[];
	onDelete: (id: Task['id']) => void;
	onToggle: (id: Task['id']) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => {
	const [notification, setNotification] = useState('');

	useEffect(() => {
		const incompleteItemsCount = items.filter(item => !item.done).length;
		if (incompleteItemsCount > 10) setNotification('Список не может содержать более 10 невыполненных задач');
		else setNotification('');
	}, [items]);

	return (
		<>
			<span aria-label='list-notification'>{notification}</span>
			<ul className='task-list tasks'>
				{items.map(item => (
					<Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
				))}
			</ul>
		</>
	);
};
