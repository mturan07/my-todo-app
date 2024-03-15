import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") {
      Swal.fire({
        title: "Oops...",
        text: "You should enter a text!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <Container maxWidth="sm">
      <h1>Todo App</h1>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addTodo}>
        Add Todo
      </Button>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index} dense>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <ListItemText primary={todo.text} />
            <IconButton
              onClick={() => deleteTodo(index)}
              edge="end"
              aria-label="delete"
              style={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
