import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_SOME_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        const response = await axios.get(url);
        const data = response.data;

        setWeather({
          temperature: data.main.temp,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
        });
      } catch (err) {
        setError('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.temperature} °C</p>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="Weather Icon"
      />
    </div>
  );
};

export default Weather;
