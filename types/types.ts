export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface AppState {
    user: User | null;
  }
  
  export type Action =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };