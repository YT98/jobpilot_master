export interface Account {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
  
export interface AppState {
  account: Account | null;
  loading: boolean;
}

export type Action =
  | { type: 'LOGIN'; payload: Account }
  | { type: 'LOGOUT' };