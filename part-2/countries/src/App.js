import { useState, useEffect } from "react";
import axios from "axios";

const CountryData = ({ country }) => {
  const [weatherDetails, setWeatherDetails] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;
  const capital = country.capital[0],
    area = country.area,
    languages = Object.values(country.languages),
    flag = country.flags.svg;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((response) => {
        const data = response.data;
        const weather = data.weather[0];
        const weather_main = weather.main;
        const weather_desc = weather.description;
        const weather_icon_url = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        const temperature = data.main.temp;
        setWeatherDetails({
          temperature,
          weather_main,
          weather_desc,
          weather_icon_url,
        });
      });
  }, [api_key, capital]);

  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <h4>Official name: {country.name.official}</h4>
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
      <div>
        <h2>Weather in {capital}</h2>
        <p style={{ fontSize: "24px" }}>{weatherDetails.weather_main}</p>
        <p style={{ marginTop: "-40px" }}>
          {weatherDetails.weather_desc}{" "}
          <span>
            <img
              src={weatherDetails.weather_icon_url}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                top: "20px",
              }}
            />
          </span>
        </p>
        <p>
          temperature:{" "}
          {Math.round((weatherDetails.temperature - 273.15) * 100) / 100}
          <sup>o</sup>C
        </p>
      </div>
    </>
  );
};

const Countries = ({ name }) => {
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    // console.log("I fired");
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
      <div key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => setCountries([country])}>Show</button>{" "}
      </div>
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
