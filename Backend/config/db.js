// ESM
import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
  fastify.register(fastifyMongo, {
    url: "mongodb+srv://admin:admin@cohourt.1ptheva.mongodb.net/pullseAI-Assesment",
  });
}

export default fastifyPlugin(dbConnector);
