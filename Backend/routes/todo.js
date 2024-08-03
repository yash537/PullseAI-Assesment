// routes/todo.js

async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("pullseAI-Assesment");

  // Get all todos
  fastify.get("/tasks", async (request, reply) => {
    try {
      const result = await collection.find().toArray();
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
    const { title, description, status, due_date, created_at } = request.body;
    const todo = { title, description, status, due_date, created_at };

    try {
      const result = await collection.insertOne(todo);
      if (!result.acknowledged) {
        reply.code(400).send({ message: "Invalid value" });
      } else {
        reply.code(201).send(result);
      }
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  });

  // Update an existing todo
  fastify.put("/tasks/:id", async (request, reply) => {
    const { id } = request.params;
    const { title, description, status, due_date, created_at } = request.body;
    const todo = { title, description, status, due_date, created_at };

    try {
      const result = await collection.updateOne(
        { _id: new fastify.mongo.ObjectId(id) },
        { $set: todo }
      );
      if (result.matchedCount === 0) {
        reply.code(404).send({ message: "Document not found" });
      } else {
        reply.code(200).send({ message: "Document updated successfully" });
      }
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  });

  // Delete a todo
  fastify.delete("/tasks/:id", async (request, reply) => {
    const { id } = request.params;

    try {
      const result = await collection.deleteOne({
        _id: new fastify.mongo.ObjectId(id),
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
