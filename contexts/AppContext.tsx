import { createContext, useEffect, useReducer } from 'react';
import { AppState, Action } from '../types/types';
import { appReducer } from '../reducers/appReducer';

type AppContextType = {
    appState: AppState;
    appDispatch: React.Dispatch<Action>;
  }

const initialState: AppState = {
  user: null,
  loading: true
};

export const AppContext = createContext<AppContextType>({
  appState: initialState,
  appDispatch: () => {},
});

type AppProviderProps = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      appDispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(appState.user));
  }, [appState.user]);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;