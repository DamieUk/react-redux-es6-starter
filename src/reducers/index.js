import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import home from '../pages/home/reducer';
import communications from './communications';

const reducers = combineReducers({
  routing: routerReducer,
  form,
  communications,
  home,
});

export default reducers;