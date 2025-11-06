import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './configureStore';

export interface taskListState {
	list: Task[];
	filter: 'all' | Task['done'];
	notification: string;
}

const initialState: taskListState = {
	list: [],
	filter: 'all',
	notification: '',
};

export const taskListSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task['header']>) => {
			state.list.push({
				id: crypto.randomUUID(),
				header: action.payload,
				done: false,
			});
		},
		completeTask: (state, action: PayloadAction<Task['id']>) => {
			const task = state.list.find(x => x.id === action.payload);

			if (task) {
				task.done = true;
			}
		},
		toggleTask: (state, action: PayloadAction<Task['id']>) => {
			const task = state.list.find(x => x.id === action.payload);

			if (task) {
				task.done = !task.done;

				if (task.done) {
					state.notification = `Задача "${task.header}" завершена`;
				}
			}
		},
		deleteTask: (state, action: PayloadAction<Task['id']>) => {
			state.list = state.list.filter(x => x.id !== action.payload);
		},
		setFilter: (state, action: PayloadAction<Task['done'] | 'all'>) => {
			state.filter = action.payload;
		},
		setNotification: (state, action: PayloadAction<Task['header']>) => {
			state.notification = `Задача "${action.payload}" завершена`;
		},
		clearNotification: state => {
			state.notification = '';
		},
	},
});

export const { addTask, completeTask, deleteTask, setFilter, toggleTask, clearNotification } = taskListSlice.actions;

export default taskListSlice.reducer;

export const filteredTasksSelector = ({ taskList: { list, filter } }: RootState) => {
	if (filter === 'all') return list;
	return list.filter(item => item.done === filter);
};

export const tasksSelector = (state: RootState) => state.taskList.list;

export const fullCount = (state: RootState) => state.taskList.list.length;

export const completeCount = (state: RootState) => state.taskList.list.filter(x => x.done).length;

export const incompleteCount = (state: RootState) => state.taskList.list.filter(x => !x.done).length;

export const getNotification = (state: RootState) => state.taskList.notification;
