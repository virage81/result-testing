import { useMemo } from 'react';
import { DeleteButton } from './DeleteButton';

type Props = Task & {
	onDelete: (id: Task['id']) => void;
	onToggle: (id: Task['id']) => void;
};

export const Item = (props: Props) => {
	const { header } = props;
	if (!header) return null;

	const formattedHeader = useMemo(() => {
		if (header.length > 32) return `${header.slice(0, 29)}...`;
		return header;
	}, [header]);

	return (
		<li className='item-wrapper'>
			<input type='checkbox' id={props.id} defaultChecked={props.done} onChange={() => props.onToggle(props.id)} />
			<label aria-label='task-name' htmlFor={props.id} onClick={() => props.onToggle(props.id)}>
				{props.done ? <s>{formattedHeader}</s> : formattedHeader}
			</label>
			<DeleteButton disabled={!props.done} onClick={() => props.onDelete(props.id)} />
		</li>
	);
};
