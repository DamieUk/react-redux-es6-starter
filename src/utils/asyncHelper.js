import { types } from '../reducers/communications';
import { generateId } from "./helpers";

export const showPrompt = (dispatch, payload) => dispatch({
  type: types.showPrompt,
  payload,
});

export const hidePrompt = (dispatch) => dispatch({
  type: types.hidePrompt,
});

export const removePromptContent = (dispatch) => dispatch({
  type: types.hidePromptContent,
});

export const showToast = (dispatch, message, type = 'error') => dispatch({
  type: types.showToast,
  payload: { message, type, id: generateId(), open: true },
});

export const hideToast = (dispatch, id) => dispatch({
  type: types.hideToast,
  payload: id,
});

export const removeToast = (dispatch, id) => dispatch({
  type: types.removeToast,
  payload: id,
});

export const startFetching = (dispatch, namespace) => dispatch({
  type: types.startLoading,
  payload: namespace,
});

export const finishFetching = (dispatch, namespace = 'globalLoading') => dispatch({
  type: types.endLoading,
  payload: namespace,
});

export const isLoading = (namespace = 'globalLoading') => (state) => (
  state.communications.loadingNamespaces.includes(namespace)
);