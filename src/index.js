import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './app';
import { createStore } from 'redux';
import reducers from './redux/reducers';
import {Provider} from  'react-redux'

const store = createStore(reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
	<App/>
	</Provider>,
	document.getElementById('root')
);