const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());

morgan.token("post", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

morgan.format(
  "getPost",
  ":method :url :status :res[content-length] - :response-time ms :post"
);

app.use(morgan("getPost"));
app.use(cors());

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
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});

const generateID = () => Math.floor(Math.random() * 1000);
const check = (id) => {
  const present = persons.find((p) => p.id === id);
  // console.log(present);
  if (present) return true;
  return false;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // error handling
  if (!body.name) return response.status(400).json({ error: "name missing" });
  if (!body.number)
    return response.status(400).json({ error: "number missing" });
  name_exist = persons.find((p) => p.name === body.name);
  if (name_exist)
    return response.status(400).json({ error: "name must be unique" });

  // generating unique id
  let id = generateID();
  while (check(id)) {
    id = generateID();
  }

  // creating and adding person
  const person = {
    id: id,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  // console.log(persons);
  response.status(204).end();
});

app.get("/info", (req, res) => {
  const info = {
    length: persons.length,
    date: new Date(),
  };
  res.send(`Phonebook has info for ${info.length} people<br><br>${info.date}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
