import { TodoStates } from './TodoStates';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  state: TodoStates;
}
