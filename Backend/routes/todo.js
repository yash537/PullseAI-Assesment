import Todo from "../models/todo.js";
import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema.js";
import { z } from "zod";

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
      const validated = createTodoSchema.parse(request.body);
      const todo = new collection(validated);
      const result = await todo.save();
      reply.code(201).send(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.code(400).send({
          message: "Validation error",
          errors: err.errors.map((e) => ({
            path: e.path.join("."), // Show full path to the invalid field
            message: e.message,
          })),
        });
      } else {
        reply.code(400).send({ message: err.message });
      }
    }
  });

  // Update an existing todo
  fastify.put("/tasks/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      // Validate input
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
      if (err instanceof z.ZodError) {
        reply.code(400).send({
          message: "Validation error",
          errors: err.errors.map((e) => ({
            path: e.path.join("."), // Show full path to the invalid field
            message: e.message,
          })),
        });
      } else {
        reply.code(400).send({ message: err.message });
      }
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
