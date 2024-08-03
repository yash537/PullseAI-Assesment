import Todo from "../models/todo.js";
import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema.js";

async function routes(fastify, options) {
  const collection = fastify.mongoose.model("Todo");

  // Get all todos
  fastify.get("/tasks", async (request, reply) => {
    try {
      const result = await collection.find().exec();
      if (result.length === 0) {
        reply.code(404).send({ message: "No documents found" });
      } else {
        reply.code(200).send(result);
      }
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  });

  // Create a new todo
  fastify.post("/tasks", async (request, reply) => {
    try {
      // Validate input
      if (request.body.due_date) {
        request.body.due_date = new Date(request.body.due_date);
      }
      if (request.body.created_at) {
        request.body.created_at = new Date(request.body.created_at);
      }
      const validated = createTodoSchema.parse(request.body);
      const todo = new collection(validated);
      const result = await todo.save();
      reply.code(201).send(result);
    } catch (err) {
      reply.code(400).send({ message: err.message });
    }
  });

  // Update an existing todo
  fastify.put("/tasks/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      // Validate input
      if (request.body.due_date) {
        request.body.due_date = new Date(request.body.due_date);
      }
      if (request.body.created_at) {
        request.body.created_at = new Date(request.body.created_at);
      }
      const validated = updateTodoSchema.parse(request.body);
      const result = await collection.updateOne(
        { _id: new fastify.mongoose.Types.ObjectId(id) },
        { $set: validated }
      );
      if (result.matchedCount === 0) {
        reply.code(404).send({ message: "Document not found" });
      } else {
        reply.code(200).send({ message: "Document updated successfully" });
      }
    } catch (err) {
      reply.code(400).send({ message: err.message });
    }
  });

  // Delete a todo
  fastify.delete("/tasks/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const result = await collection.deleteOne({
        _id: new fastify.mongoose.Types.ObjectId(id),
      });
      if (result.deletedCount === 0) {
        reply.code(404).send({ message: "Document not found" });
      } else {
        reply.code(200).send({ message: "Document deleted successfully" });
      }
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  });
}

export default routes;
