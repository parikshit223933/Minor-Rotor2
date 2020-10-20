import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import logger from 'redux-logger';

export default function configureStore(useLogger = false) {
	let store = useLogger
		? createStore(reducer, applyMiddleware(thunk, logger))
		: createStore(reducer, applyMiddleware(thunk));

	return store;
}
