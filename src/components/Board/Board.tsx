import { DragEvent, useEffect, useState } from 'react';
import './Board.scss';
import { IBoard, IItem, TodoInfo } from '../../types/TodoBoardProps';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchUsers } from '../../store/action-creators/user';
import { fetchTodos } from '../../store/action-creators/todo';
import TicketContent from '../TicketContent/TicketContent';
import { UserProps } from '../../types/UserProps';
import { getRandom } from '../Helper/getRandomColor/getRandom';

const Board = () => {
  const { todos } = useTypedSelector((state) => state.todo);
  const { users } = useTypedSelector((state) => state.user);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'To Do',
      todos: todos,
    },
    {
      id: 2,
      title: 'In Progress',
      todos: [],
    },
    {
      id: 3,
      title: 'Done',
      todos: [],
    },
  ]);

  useEffect(() => {
    fetchUsers();
    fetchTodos();
  }, []);

  const [currentBoard, setCurrentBoard] = useState<IBoard>(null);
  const [currentItem, setCurrentItem] = useState<IItem>(null);

  function dragOverHandler(e: any) {
    e.preventDefault();
    if (e.target.className == 'boards__item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e: any) {
    e.target.style.boxShadow = 'none';
  }

  function dragStartHandler(e: any, board: IBoard, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e: any) {
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(
    e: DragEvent<HTMLDivElement>,
    board: IBoard,
    item: IItem
  ) {
    e.preventDefault();
    const currentIndex = currentBoard?.todos.indexOf(currentItem);
    currentBoard?.todos.splice(currentIndex, 1);
    const dropIndex = board.todos.indexOf(item);
    currentBoard?.todos.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  getRandom(2, 255);
  const color = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(
    0,
    255
  )})`;

  function dropCardHandler(e, board: IBoard) {
    board.todos.push(currentItem);
    const currentIndex = currentBoard?.todos.indexOf(currentItem);
    currentBoard?.todos.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div className="boards">
      {boards.map((board) => (
        <div
          className="boards__board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className="boards__title">{board.title}</div>

          {board.todos.map((item: TodoInfo) => {
            return (
              <div
                className="boards__item"
                draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
              >
                {users.map((user: UserProps) => {
                  if (user.id === item.userId) {
                    return (
                      <TicketContent
                        userName={user.name}
                        todo={item}
                        color={color}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default Board;
