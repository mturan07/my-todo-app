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
import { Tabs, Tab } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (tabValue === 1) return !todo.completed;
    if (tabValue === 2) return todo.completed;
    return true;
  });

  const addTodo = (todoText) => {
    if (todoText.trim() === "") {
      Swal.fire({
        title: "Oops...",
        text: "You should enter a text!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    setTodos([...todos, { text: todoText, completed: false }]);
  };

  const deleteTodo = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
        setTodos(newTodos);
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    });
  };

  const toggleTodo = (index) => {
    const todo = todos[index];

    if (!todo.completed) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to mark this todo as completed?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, complete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          completeTodo(index);
        }
      });
    } else {
      completeTodo(index);
    }
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);

    if (newTodos[index].completed) {
      Swal.fire(
        "Completed!",
        "Your todo has been marked as completed.",
        "success"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Todo App</h1>
      <TodoInput onAddTodo={addTodo} />

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="All" />
        <Tab label="Active" />
        <Tab label="Completed" />
      </Tabs>

      <List>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            tabValue={tabValue}
          />
        ))}
      </List>
    </Container>
  );
}

export default App;
