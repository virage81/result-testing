import { store } from './store/configureStore';

import { Provider } from 'react-redux';
import { NewTaskBar } from './modules/NewTaskBar';
import { NotifierContainer } from './modules/NotifierContainer';
import { TaskList } from './modules/TaskList';
import './styles.css';

export const App = () => {
	return (
		<div className='root-container'>
			<Provider store={store}>
				<h3>Список задач</h3>
				<NewTaskBar />
				<TaskList />
				<NotifierContainer />
			</Provider>
		</div>
	);
};
