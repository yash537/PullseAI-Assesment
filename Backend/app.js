import Fastify from "fastify";
import Todo from "./routes/todo.js";
import dbConnector from "./config/db.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector).after((err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log("db connected succesfully");
  fastify.register(Todo);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
