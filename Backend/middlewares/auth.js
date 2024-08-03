import jwt from "jsonwebtoken";

const JWT_SECRET = "Zoro1410";

async function usermiddleware(request, reply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.code(401).send({ msg: "Authorization header missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return reply.code(401).send({ msg: "Invalid authorization format" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    request.user = decodedToken; // Attach decoded token to request object
  } catch (err) {
    return reply.code(401).send({ msg: "Invalid or expired token" });
  }
}

export default usermiddleware;
