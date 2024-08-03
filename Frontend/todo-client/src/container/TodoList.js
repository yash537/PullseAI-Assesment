import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import { fetchTodos, deleteTodo } from "../redux/actions";

const TodoList = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleSave = () => {
    dispatch(fetchTodos());
    setSelectedTodo(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setSelectedTodo(null);
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <TodoForm
          todo={selectedTodo}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <h1>Todo List</h1>
      <button onClick={() => setShowForm(true)}>Add New Todo</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Due Date: {new Date(todo.due_date).toLocaleDateString()}</p>
            <p>
              Created At:{" "}
              {todo.created_at
                ? new Date(todo.created_at).toLocaleDateString()
                : "N/A"}
            </p>
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
