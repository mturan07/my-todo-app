import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function TodoInput({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    onAddTodo(newTodo);
    setNewTodo(""); // Reset input field after adding todo
  };

  return (
    <div>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </div>
  );
}

export default TodoInput;
