import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Ticket from './Ticket';
import { ITodo } from '../types/ITodo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

export default function TicketList(data: { todoList: ITodo[] }) {
  const [taskState, setTaskState] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTaskState(event.target.value as string);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        height: '40%',
        overflow: 'auto',
      }}
    >
      <List sx={{ padding: '2%' }}>
        {data &&
          data.todoList?.map((todo: ITodo) => {
            return (
              <>
                <ListItem
                  key={todo.id}
                  sx={{ margin: '1%', justifyContent: 'center' }}
                >
                  <Ticket
                    userId={todo.userId}
                    todo_id={todo.id}
                    title={todo.title}
                  />

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">State</InputLabel>
                      <Select
                        labelId="select-label"
                        id="select-label"
                        value={taskState}
                        label="State"
                        onChange={handleChange}
                      >
                        <MenuItem value={'Todo'}>Todo</MenuItem>
                        <MenuItem value={'InProgress'}>In Progress</MenuItem>
                        <MenuItem value={'Done'}>Done</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </ListItem>
                <Divider sx={{ color: 'black' }} />
              </>
            );
          })}
      </List>
    </Paper>
  );
}
