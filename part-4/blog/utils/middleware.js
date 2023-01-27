const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  // console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer "))
    request.token = authorization.slice(7);
  else {
    request.token = null;
  }
  return next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
};
