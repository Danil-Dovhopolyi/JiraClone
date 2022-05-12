import { FC, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './Ticket.scss';
import TicketContent from '../TicketContent/TicketContent';
import { TodoInfo } from '../../types/TodoBoardProps';

export interface TicketProps {
  userName: string;
  userId: number;
}

const Ticket: FC<TicketProps> = ({ userName, userId }) => {
  const { todos, loading, error } = useTypedSelector((state) => state.todo);
  const { fetchTodos } = useActions();

  useEffect(() => {
    fetchTodos();
    console.log('hello');
  }, []);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  function getRandom(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
  const color = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(
    0,
    255
  )})`;

  return (
    <>
      {todos.map((todo: TodoInfo) => {
        if (todo.userId === userId) {
          return (
            <div className="list__ticket">
              <div className="list__ticketTask">
                <TicketContent userName={userName} todo={todo} color={color} />
                <div className="list__states">
                  <select name="state">
                    <option value="Todo">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Ticket;
