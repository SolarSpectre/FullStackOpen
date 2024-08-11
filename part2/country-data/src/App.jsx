import { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchvalue, setSearchValue] = useState('');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  const onSearch = (event) => {
    event.preventDefault();
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${searchvalue}`)
      .then(response => {
        console.log(response.data)
        setCountry(response.data); 
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setCountry(null);
        setError("Country not found or an error occurred.");
      });
  };

  return (
    <>
      <p>Find countries</p>
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Enter country name"
          value={searchvalue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {country && (
        <div>
          <h2><strong>{country.name.common}</strong></h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <p>Languages:</p>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
            <img src={country.flags.png} height='100px' width='100px'/>
        </div>
      )}
    </>
  );
}

export default App;
