import fastifyPlugin from "fastify-plugin";
import mongoose from "mongoose";

async function dbConnector(fastify, options) {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cohourt.1ptheva.mongodb.net/pullseAI-Assesment",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    fastify.decorate("mongoose", mongoose);
    console.log("db connected successfully");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

export default fastifyPlugin(dbConnector);
