import { createContext, useEffect, useReducer } from 'react';
import { AppState, Action } from '../types/types';
import { appReducer } from '../reducers/appReducer';

type AppContextType = {
    appState: AppState;
    appDispatch: React.Dispatch<Action>;
  }

const initialState: AppState = {
  user: null,
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
      console.log('checking if user is logged in', user)
      appDispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  useEffect(() => {
    console.log("user is logged in, updating local storage", appState.user)
    localStorage.setItem('user', JSON.stringify(appState.user));
  }, [appState.user]);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default  AppProvider;