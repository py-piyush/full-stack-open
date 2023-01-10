const Persons = ({ displayPerson }) =>
  displayPerson.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));

export default Persons;
