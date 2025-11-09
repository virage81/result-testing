import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from 'src/store/configureStore';

interface ExtendedRenderOptions extends RenderOptions {
	preloadedState?: Partial<RootState>;
	store?: AppStore;
}

export const JestStoreProvider = (children: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
	const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

	const Wrapper = ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>;

	return {
		store,
		...render(children, { wrapper: Wrapper, ...renderOptions }),
	};
};
