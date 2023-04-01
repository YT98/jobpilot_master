import { AppState, Action } from '../types/types';

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};