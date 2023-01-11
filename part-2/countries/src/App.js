import { useState, useEffect } from "react";
import axios from "axios";

const CountryData = ({ country }) => {
  const capital = country.capital[0],
    area = country.area,
    languages = Object.values(country.languages),
    flag = country.flags.svg;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {capital}</p>
      <p>
        area: {area.toLocaleString()} km<sup>2</sup>
      </p>
      <p>Languages:</p>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={country.name.commom} style={{ width: "300px" }} />
    </div>
  );
};

const Countries = ({ name }) => {
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    if (name !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => setCountries(response.data))
        .catch((error) => setErrorMessage("Country not found!"));
    }
  }, [name]);

  if (errorMessage !== "") {
    return <div>{errorMessage}</div>;
  }

  let size = countries.length;
  if (size > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (size > 1) {
    return countries.map((country) => (
      <div key={country.name.common}>{country.name.common}</div>
    ));
  } else if (size === 1) {
    return <CountryData country={countries[0]} />;
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <div>
        find countries:{" "}
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <div>
        <Countries name={filter} />
      </div>
    </div>
  );
};

export default App;
