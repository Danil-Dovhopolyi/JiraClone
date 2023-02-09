import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ITodo } from '../types/ITodo';
import Paper from '@mui/material/Paper';
import { Title } from './styledComponents/Title';
import { TaskList } from './styledComponents/TaskList';
import { TaskColumnStyles } from './styledComponents/TaskColumn';
import { DroppableStyles } from './styledComponents/DroppableStyles';
const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function TicketBoard(data: { todoList: ITodo[] }) {
  const columnsFromBackend = {
    [uuidv4()]: {
      name: 'To do',
      items: data.todoList,
    },
    [uuidv4()]: {
      name: 'In Progress',
      items: [],
    },
    [uuidv4()]: {
      name: 'Done',
      items: [],
    },
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '30%',
                }}
                key={columnId}
              >
                <Title>{column.name}</Title>

                <div
                  style={{
                    margin: 8,
                    overflow: 'auto',
                    height: '400px',
                  }}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <TaskList
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : '#007dff',
                            padding: 4,
                            width: '80%',
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...DroppableStyles,
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.title}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </TaskList>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </TaskColumnStyles>
      </DragDropContext>
    </Paper>
  );
}
