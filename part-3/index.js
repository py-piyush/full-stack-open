/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const People = require("./models/people");

const app = express();
app.use(express.json());

// morgan.token("post", (req) => {
//   if (req.method === "POST") {
//     return JSON.stringify(req.body);
//   }
//   return "";
// });

// morgan.format(
//   "getPost",
//   ":method :url :status :res[content-length] - :response-time ms :post"
// );

// app.use(morgan("getPost"));
app.use(cors());
app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  People.find({}).then((result) => response.json(result));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  People.findById(id)
    .then((result) => {
      if (result) response.json(result);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

// const generateID = () => Math.floor(Math.random() * 1000);
// const check = (id) => {
//   const present = persons.find((p) => p.id === id);
//   // console.log(present);
//   if (present) return true;
//   return false;
// };

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // error handling
  if (!body.name) return response.status(400).json({ error: "name missing" });
  if (!body.number)
    return response.status(400).json({ error: "number missing" });
  // name_exist = People.find({ name: body.name });
  // if (name_exist)
  //   return response.status(400).json({ error: "name must be unique" });

  // generating unique id
  // let id = generateID();
  // while (check(id)) {
  //   id = generateID();
  // }

  // creating and adding person
  const person = new People({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((saved) => response.json(saved))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  People.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  const updatedPerson = {
    number: body.number,
  };
  People.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updated) => response.json(updated))
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  People.count({}).then((result) => {
    const info = {
      length: result,
      date: new Date(),
    };
    res.send(
      `Phonebook has info for ${info.length} people<br><br>${info.date}`
    );
  });
});

// ERROR HANDLERS
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
