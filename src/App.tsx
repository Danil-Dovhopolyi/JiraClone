import React from 'react';
import './App.scss';
import Box from '@mui/material/Box';
import TicketList from './components/TicketList';

function App() {
  return (
    <Box
      sx={{
        '&': {
          margin: '1%',
          height: '90vh',
        },
      }}
    >
      <TicketList />
    </Box>
  );
}

export default App;
