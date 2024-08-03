import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  due_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
