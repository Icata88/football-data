import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import competitionsReducer from './reducers/competitionsReducer';
import leagueTableReducer from './reducers/leagueTableReducer';


const rootReducer = combineReducers({
	competitionsReducer,
	leagueTableReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
	), document.getElementById('root'));
registerServiceWorker();
