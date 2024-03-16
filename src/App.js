import "./App.css";

import React, { useState } from "react";
import { useTodoManager } from "./hooks/useTodoManager";
import { Container, List } from "@mui/material";

import Swal from "sweetalert2";
import { Tabs, Tab } from "@mui/material";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodoManager();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (tabValue === 1) return !todo.completed;
    if (tabValue === 2) return todo.completed;
    return true;
  });

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
