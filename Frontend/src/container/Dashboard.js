import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../redux/actions";
import "../styles/dashboard.css";
import { ReactComponent as BackgroundSVG } from "../assest/home1.svg";
import TodoForm from "./TodoForm";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const todos = useSelector((state) => state.items);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      dispatch(fetchTodos());
    }
  }, [dispatch, navigate, token]);

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.success("Task deleted successfully!");
    setSelectedTodo(null);
  };

  const handleAddClick = () => {
    setSelectedTodo(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleSave = (savedTodo) => {
    dispatch(fetchTodos())
      .then(() => {
        setSelectedTodo(savedTodo);
        setShowForm(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch todos after save.");
      });
  };

  const handleCancel = () => {
    setSelectedTodo(null);
    setShowForm(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  const handleSignOut = (e) => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      if (a.status === "Done" && b.status !== "Done") return 1;
      if (a.status !== "Done" && b.status === "Done") return -1;
      return 0;
    });

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">TodoApp</div>
        <nav className="navigation">
          <Link to="/" onClick={handleHomeClick}>
            Home
          </Link>
          <Link to="/">About</Link>
          <Link to="/" onClick={handleSignOut}>
            Sign Out
          </Link>
        </nav>
      </header>
      <ToastContainer />
      <div className="main-container">
        <div className="todo-list">
          <h2>Todo List</h2>
          <button className="add-task-button" onClick={handleAddClick}>
            Add Task
          </button>
          <input
            type="text"
            placeholder="Search tasks by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <ul>
            {filteredTodos.map((todo) => (
              <li
                key={todo._id}
                onClick={() => handleTodoClick(todo)}
                className={todo.status === "Done" ? "done" : ""}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="todo-details">
          {selectedTodo ? (
            <div className="todo-card">
              <div className="todo-card-title">{selectedTodo.title}</div>
              <div className="todo-card-description">
                {selectedTodo.description}
              </div>
              <div className="todo-card-status">
                Status: {selectedTodo.status}
              </div>
              <div className="todo-card-due-date">
                Due Date: {new Date(selectedTodo.due_date).toLocaleDateString()}
              </div>
              <div className="todo-card-created-at">
                Created At:{" "}
                {selectedTodo.created_at
                  ? new Date(selectedTodo.created_at).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="todo-actions">
                <button onClick={() => handleEdit(selectedTodo)}>Edit</button>
                <button onClick={() => handleDelete(selectedTodo._id)}>
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p>Select a todo to see the details.</p>
          )}
          <div className="background-svg">
            <BackgroundSVG />
          </div>
        </div>
      </div>
      {showForm && (
        <TodoForm
          todo={selectedTodo}
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;
