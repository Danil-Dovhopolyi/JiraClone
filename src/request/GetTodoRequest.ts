import axios from 'axios';
import { ITodo } from '../types/ITodo';
import { TodoStates } from '../types/TodoStates';

type GetTodoResponse = {
  data: ITodo[];
  status: number;
};

export async function GetTodoRequest() {
  try {
    const todoResponse = await axios.get<string, GetTodoResponse>(
      'https://jsonplaceholder.typicode.com/todos?&_limit=50',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    let todoList = todoResponse.data;

    todoList.forEach((item) => {
      item.state = item.completed ? TodoStates.Done : TodoStates.Todo;
    });

    return todoList;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return [];
    } else {
      console.log('unexpected error: ', error);
      return [];
    }
  }
}
