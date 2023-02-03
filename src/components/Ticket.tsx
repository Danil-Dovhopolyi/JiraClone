import { useState, useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { GetUserRequest } from '../request/GetUserRequest';
import { IUser } from '../types/IUser';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../helpers/UserAvatar';

export default function Ticket(todo: {
  userId: number;
  todo_id: number;
  title: string;
}) {
  const [users, setUser] = useState([]);
  useEffect(() => {
    GetUserRequest().then((res) => {
      setUser(res);
    });
  }, [users.length]);
  return (
    <>
      {users.map((user: IUser) => {
        if (user.id === todo.userId) {
          return (
            <div
              className="task"
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '75%',
                gap: '5%',
              }}
            >
              <div key={user.id}>
                <Avatar {...stringAvatar(user.name)} />
              </div>
              <ListItemText
                primary={todo.title}
                style={{ textAlign: 'center' }}
              />
            </div>
          );
        }
      })}
    </>
  );
}
