import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from 'src/store/taskSlice';

export const Filter = () => {
	const dispatch = useDispatch();

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;

		dispatch(setFilter(value === 'all' ? value : value === 'true'));
	};

	return (
		<select name='filter-list' defaultValue={'all'} onChange={handleChange}>
			<option value='all'>All</option>
			<option value='true'>Done</option>
			<option value='false'>Not done</option>
		</select>
	);
};
