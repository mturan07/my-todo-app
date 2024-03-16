import { useState } from "react";
import Swal from "sweetalert2";

export const useTodoManager = (initialTodos = []) => {
  const [todos, setTodos] = useState(initialTodos);

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

  return { todos, addTodo, deleteTodo, toggleTodo, completeTodo };
};
