import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from 'src/utils/persist';
import taskListReducer from './taskSlice';

const persistedState = loadState();

const rootReducer = combineReducers({
	taskList: taskListReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	preloadedState: persistedState,
});

store.subscribe(() => {
	saveState({
		...store.getState(),
	});
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
