import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNewNameandNumber = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    const check = persons.filter((person) => person.name === newName);
    if (check.length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };

  const displayPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addNewNameandNumber}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {displayPerson.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
