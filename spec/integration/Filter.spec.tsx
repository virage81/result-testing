import ue from '@testing-library/user-event';
import { TaskList } from 'src/modules/TaskList';
import { filteredTasksSelector, taskListState } from 'src/store/taskSlice';
import { JestStoreProvider } from '../utils/JestStoreProvider';

describe('Список задач', () => {
	const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime });

	test('с включенным фильтром', async () => {
		const preloadedTaskListState: taskListState = {
			list: [
				{ id: '1', done: false, header: 'Первая задача' },
				{ id: '2', done: true, header: 'Вторая задача' },
				{ id: '3', done: false, header: 'Третья задача' },
			],
			filter: 'all',
			notification: '',
		};

		const { getByRole, store } = JestStoreProvider(<TaskList />, {
			preloadedState: {
				taskList: preloadedTaskListState,
			},
		});

		const filterEl = getByRole('combobox');

		await userEvent.selectOptions(filterEl, 'true');

		const state = store.getState();

		expect(filteredTasksSelector(state)).toStrictEqual([{ id: '2', done: true, header: 'Вторая задача' }]);
	});

	test('с выключенным фильтром', async () => {
		const preloadedTaskListState: taskListState = {
			list: [
				{ id: '1', done: false, header: 'Первая задача' },
				{ id: '2', done: true, header: 'Вторая задача' },
				{ id: '3', done: false, header: 'Третья задача' },
			],
			filter: 'all',
			notification: '',
		};

		const { getByRole, store } = JestStoreProvider(<TaskList />, {
			preloadedState: {
				taskList: preloadedTaskListState,
			},
		});

		const filterEl = getByRole('combobox');

		await userEvent.selectOptions(filterEl, 'false');

		const state = store.getState();

		expect(filteredTasksSelector(state)).toStrictEqual([
			{ id: '1', done: false, header: 'Первая задача' },
			{ id: '3', done: false, header: 'Третья задача' },
		]);
	});

	test('сброс фильтра', async () => {
		const preloadedTaskListState: taskListState = {
			list: [
				{ id: '1', done: false, header: 'Первая задача' },
				{ id: '2', done: false, header: 'Вторая задача' },
				{ id: '3', done: true, header: 'Третья задача' },
			],
			filter: 'all',
			notification: '',
		};

		const { getByRole, store } = JestStoreProvider(<TaskList />, {
			preloadedState: {
				taskList: preloadedTaskListState,
			},
		});

		const filterEl = getByRole('combobox');

		await userEvent.selectOptions(filterEl, 'All');

		const state = store.getState();

		expect(filteredTasksSelector(state)).toStrictEqual(preloadedTaskListState.list);
	});
});
