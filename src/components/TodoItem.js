import React from "react";
import { ListItem, Checkbox, ListItemText, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem({ todo, index, toggleTodo, deleteTodo, tabValue }) {
  return (
    <ListItem dense>
      <Checkbox checked={todo.completed} onChange={() => toggleTodo(index)} />
      <ListItemText
        primary={todo.text}
        sx={{
          color: tabValue === 0 ? (todo.completed ? "blue" : "black") : "black",
        }}
      />
      <IconButton
        onClick={() => toggleTodo(index)}
        color="default"
        style={{ color: "green" }}
      >
        <CheckCircleIcon />
      </IconButton>
      <IconButton
        onClick={() => deleteTodo(index)}
        color="default"
        style={{ color: "red" }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default TodoItem;
