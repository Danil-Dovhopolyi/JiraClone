import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import Ticket from './Ticket/Ticket';
import './UserList.scss';
import { UserProps } from '../types/UserProps';

const UserList: FC = () => {
  const { users, error, loading } = useTypedSelector((state) => state.user);

  const { fetchUsers } = useActions();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="list">
      <div className="list__tickets">
        {users.map((user: UserProps) => (
          <Ticket key={user.id} userName={user.name} userId={user.id} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
