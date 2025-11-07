import { NotifierContainer } from 'src/modules/NotifierContainer';

import { act } from 'react-dom/test-utils';
import * as taskSliceModule from 'src/store/taskSlice';
import { JestStoreProvider } from '../utils/JestStoreProvider';

describe('Оповещение при выполнении задачи', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('появляется и содержит заголовок задачи', async () => {
		const preloadedTaskListState: taskSliceModule.taskListState = {
			list: [],
			filter: 'all',
			notification: '',
		};
		const { findByLabelText, store } = JestStoreProvider(<NotifierContainer />, {
			preloadedState: {
				taskList: preloadedTaskListState,
			},
		});
		const dispatchSpy = jest.spyOn(store, 'dispatch');

		await act(async () => {
			store.dispatch(taskSliceModule.setNotification('Купить молоко'));
		});

		const notificationEl = await findByLabelText('notification');
		const notificationTextEl = await findByLabelText('notification-text');

		expect(dispatchSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				payload: 'Купить молоко',
				type: expect.any(String),
			})
		);
		expect(store.getState().taskList.notification).toContain('Купить молоко');

		expect(notificationEl).toBeInTheDocument();
		expect(notificationTextEl.textContent).toContain('Купить молоко');
	});

	it('одновременно может отображаться только одно', async () => {
		const preloadedTaskListState: taskSliceModule.taskListState = {
			list: [],
			filter: 'all',
			notification: '',
		};
		const { findByLabelText, store } = JestStoreProvider(<NotifierContainer />, {
			preloadedState: {
				taskList: preloadedTaskListState,
			},
		});
		const dispatchSpy = jest.spyOn(store, 'dispatch');

		await act(async () => {
			store.dispatch(taskSliceModule.setNotification('Купить молоко'));
			store.dispatch(taskSliceModule.setNotification('Купить хлеб'));
		});

		const notificationEl = await findByLabelText('notification');
		const notificationTextEl = await findByLabelText('notification-text');

		expect(dispatchSpy).toHaveBeenCalledTimes(2);
		expect(store.getState().taskList.notification).toContain('Купить хлеб');

		expect(notificationEl).toBeInTheDocument();
		expect(notificationTextEl.textContent).not.toContain('Купить молоко');
		expect(notificationTextEl.textContent).toContain('Купить хлеб');
	});
});
