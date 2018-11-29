import {
  createStore,
  applyMiddleware,
} from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import reducers from './reducers';

const composeEnhancers = composeWithDevTools({});
const browserHistory = createBrowserHistory();
const middlewares = [routerMiddleware(browserHistory)];

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;