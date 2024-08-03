import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  due_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Todo", todoSchema);
