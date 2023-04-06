import { AppState, Action } from '../types/types';

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loading: false,
        account: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        account: null,
      };
    default:
      return state;
  }
};