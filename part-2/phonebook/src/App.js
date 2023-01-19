import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import Notification from "./components/Notification.js";
import services from "./services/peronsService.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to replace the phone number with new one?`
        )
      ) {
        updateNumber(check[0].id);
        return;
      }
    }
    services
      .create(personObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMsg({
          msg: `${returnedPerson.name} Added Successfully`,
          class: "success",
        });
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      })
      .catch((error) => {
        setMsg({
          msg: error.response.data.error,
          class: "error",
        });
        setTimeout(() => {
          setMsg(null);
        }, 2000);
        console.log(error.response.data.error);
      });
    setNewName("");
    setNewNumber("");
  };

  let displayPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => id === person.id);
    // console.log(deletePerson);
    const confirm = window.confirm(`Delete "${personToDelete.name}" ?`);
    if (!confirm) return;
    services
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMsg({
          msg: `${personToDelete.name} deleted successfully`,
          class: "success",
        });
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      })
      .catch((error) => {
        setMsg({
          msg: error.response.data.error,
          class: "error",
        });
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      });
  };

  const updateNumber = (id) => {
    const updatePerson = persons.find((person) => person.id === id);
    const changedNumber = { ...updatePerson, number: newNumber };
    services
      .update(id, changedNumber)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
        setMsg({
          msg: `Phone number updated for ${returnedPerson.name}`,
          class: "success",
        });
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      })
      .catch((error) => {
        setMsg({
          msg: error.response.data.error,
          class: "error",
        });
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      });
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
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
      <Persons displayPerson={displayPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
