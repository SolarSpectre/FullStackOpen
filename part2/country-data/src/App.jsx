import { useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  const onSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then(response => {
        const filteredCountries = response.data.filter(
          country => country.name.common.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredCountries.length > 10) {
          setCountries([]);
          setError("Too many matches, specify more please");
        } else if (filteredCountries.length === 0) {
          setCountries([]);
          setError("Country not found or an error occurred.");
        } else {
          setCountries(filteredCountries);
          setError(null);
        }
      })
      .catch(err => {
        console.error(err);
        setCountries([]);
        setError("Country not found or an error occurred.");
      });
  };

  const handleShow = (index) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific country's show state
    }));
  };

  return (
    <>
      <p>Find countries</p>
      <input
        type="text"
        placeholder="Enter country name"
        value={searchValue}
        onChange={onSearch}
      />
      {error && <p>{error}</p>}
      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map((country, index) => (
            <li key={index}>
              {country.name.common} 
              <button onClick={() => handleShow(index)}>
                {showDetails[index] ? 'hide' : 'show'}
              </button>
              {showDetails[index] && <Country country={country} />}
            </li>
          ))}
        </ul>
      )}
      {countries.length === 1 && (
        <Country country={countries[0]} />
      )}
    </>
  );
}

export default App;
