export interface TodoInfo {
  id: number;
  title: string;
  userId: number;
  color: string;
}
export interface IItem {
  id: number;
  title: string;
}
export interface IBoard {
  id: number;
  title: string;
  todos: IItem[];
}
