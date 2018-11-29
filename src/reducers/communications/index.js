import { actionTypesCreatorMap } from '../../utils/actionCreator';

export const types = actionTypesCreatorMap('@@COMMUNICATIONS', {
	startLoading : ['loader', 'start'],
	endLoading : ['loader', 'end'],
	showPrompt : ['prompt', 'show'],
	hidePrompt : ['prompt', 'hide'],
	hidePromptContent : ['prompt', 'content', 'hide'],
	showToast: ['toast', 'show'],
	hideToast: ['toast', 'hide'],
	removeToast: ['toast', 'remove'],
});

export const initialState = {
  loadingNamespaces: [],
  toasts: [],
  prompt: null,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case types.showPrompt:
      return {
        ...state,
        prompt: {
          open: true,
          ...payload,
        },
      };

    case types.hidePrompt:
      return {
        ...state,
        prompt: {
          ...state.prompt,
          open: false,
        },
      };
      
    case types.hidePromptContent:
      return {
        ...state,
        prompt: null,
      };

    case types.startLoading:
      return {
        ...state,
        loadingNamespaces: [...state.loadingNamespaces, payload],
      };

    case types.showToast:
      return {
        ...state,
        toasts: [...state.toasts, payload],
      };

    case types.endLoading:
      return {
        ...state,
        loadingNamespaces: state.loadingNamespaces.filter(name => name !== payload),
      };

    case types.hideToast:
      return {
        ...state,
        toasts: state.toasts.map(toast => toast.id === payload ? { ...toast, open: false } : toast),
      };
      
    case types.removeToast:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== payload),
      };

    default:
      return state;
  }
};