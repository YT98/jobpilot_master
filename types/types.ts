export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    loading: boolean;
  }
  
export interface AppState {
  user: User | null;
  loading: boolean;
}

export type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };