import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/actions";

const TodoForm = ({ todo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
    created_at: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || "",
        description: todo.description || "",
        status: todo.status || "",
        due_date: todo.due_date
          ? new Date(todo.due_date).toISOString().split("T")[0]
          : "",
        created_at: todo.created_at
          ? new Date(todo.created_at).toISOString().split("T")[0]
          : "",
        _id: todo._id,
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo && todo._id) {
      dispatch(updateTodo(formData));
    } else {
      dispatch(addTodo(formData));
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Created At</label>
        <input
          type="date"
          name="created_at"
          value={formData.created_at}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TodoForm;
