import { createContext, useEffect, useReducer } from 'react';
import { AppState, Action } from '../types/types';
import { appReducer } from '../reducers/appReducer';

type AppContextType = {
    appState: AppState;
    appDispatch: React.Dispatch<Action>;
  }

const initialState: AppState = {
  account: null,
  loading: true
};

export const AppContext = createContext<AppContextType>({
  appState: initialState,
  appDispatch: () => {
    return;
  },
});

type AppProviderProps = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);

  // When the app loads, check if the user is logged in
  useEffect(() => {
    const account = localStorage.getItem('account');
    if (account) {
      appDispatch({ type: 'LOGIN', payload: JSON.parse(account) });
    }
  }, []);

  // When the user state changes, update the local storage
  useEffect(() => {
    localStorage.setItem('account', JSON.stringify(appState.account));
  }, [appState.account]);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;