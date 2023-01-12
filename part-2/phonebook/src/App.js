import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import services from "./services/peronsService.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    services.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNewNameandNumber = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    const check = persons.filter((person) => person.name === newName);
    if (check.length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    services
      .create(personObj)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    setNewName("");
    setNewNumber("");
  };

  let displayPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNewNameandNumber={addNewNameandNumber}
      />
      <h2>Numbers</h2>
      <Persons displayPerson={displayPerson} />
    </div>
  );
};

export default App;
