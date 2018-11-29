import moment from 'moment';
import { GET, createAction } from 'utils';
import types from './actionTypes';

export const fetchJobAction = (dispatch, payload) => dispatch(
  createAction(types.fetchJobDetails, payload)
);