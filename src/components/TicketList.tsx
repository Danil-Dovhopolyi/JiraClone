import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { GetTodoRequest } from '../request/GetTodoRequest';
import { ITodo } from '../types/ITodo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TicketList() {
  const [todoList, setTodoList] = useState([]);
  const [taskState, setTaskState] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTaskState(event.target.value as string);
  };

  useEffect(() => {
    GetTodoRequest().then((res) => {
      setTodoList(res);
    });
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        height: '40%',
        overflow: 'auto',
      }}
    >
      <List sx={{ padding: '2%' }}>
        {todoList.map((todo: ITodo) => {
          return (
            <ListItem
              key={todo.id}
              sx={{ border: '1px solid black', margin: '1%' }}
            >
              <ListItemText primary={todo.title} />

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
                    <MenuItem value={'Progress'}>In Progress</MenuItem>
                    <MenuItem value={'Done'}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
