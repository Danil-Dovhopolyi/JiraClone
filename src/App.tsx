import React, { useState, useEffect } from 'react';
import './App.scss';
import Box from '@mui/material/Box';
import TicketList from './components/TicketList';
import TicketBoard from './components/TicketBoard';
import { GetTodoRequest } from './request/GetTodoRequest';
import { ITodo } from './types/ITodo';

function App() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetTodoRequest().then((res) => {
      setTodoList(res);
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Box
      sx={{
        '&': {
          margin: '1%',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '5%',
        },
      }}
    >
      <TicketList todoList={todoList} />

      <TicketBoard todoList={todoList} />
    </Box>
  );
}

export default App;
