import React from 'react';
import Board from './components/Board/Board';
import UserList from './components/UserList';
import './App.scss';

const App = () => {
  return (
    <>
      <p>TicketList</p>
      <UserList />
      <Board />
    </>
  );
};

export default App;
