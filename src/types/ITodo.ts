import { TStateTodo } from './TStateTodo';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: false;
  state: TStateTodo;
}
