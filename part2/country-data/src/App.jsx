import { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchvalue, setSearchValue] = useState('');
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);

  const onSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value)
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then(response => {
        console.log(response.data)
        const filteredCountries = response.data.filter(
          country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        );
        if(filteredCountries.length > 10){
          setCountry([]); 
          setError("Too many matches, specify more please");      
        }else if(filteredCountries.length == 0){
          setCountry([]); 
          setError("Country not found or an error occured");
        }else{
          setCountry(filteredCountries);
          setError(null);
        }
      })
      .catch(err => {
        console.error(err);
        setCountry([]);
        setError("Country not found or an error occurred.");
      });
  };

  return (
    <>
      <p>Find countries</p>
        <input
          type="text"
          placeholder="Enter country name"
          value={searchvalue}
          onChange={(e) => onSearch(e)}
        />
      {error && <p>{error}</p>}
      {country.length > 1 && country.length <= 10 && (
        <ul>
          {country.map((country,index)=>(
          <li key={index}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {country.length == 1 && (
        <div>
          <h2><strong>{country[0].name.common}</strong></h2>
          <p>Capital: {country[0].capital[0]}</p>
          <p>Area: {country[0].area}</p>
          <p>Languages:</p>
          <ul>
            {Object.values(country[0].languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
            <img src={country[0].flags.png} height='100px' width='100px'/>
        </div>
      )}
    </>
  );
}

export default App;
