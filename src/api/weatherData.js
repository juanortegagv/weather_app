import React, { useContext } from 'react';
import { getWeatherByLocation, getWeatherByCity } from './weatherServices';
import { AppContext } from '../context/AppContext';

const kelvinToCelsius = (temp) => temp - 273.15;

const fetchWeather = async (lat, lon) => {
  const data = await getWeatherByLocation(lat, lon);
  const cityName = data.timezone.split('/')[1].replace(/[_-]/g, ' ').trim();
  const currentWeather = {
    ...data.current,
    name: cityName,
    temp_min: Math.round(kelvinToCelsius(data.daily[0].temp.min)),
    temp_max: Math.round(kelvinToCelsius(data.daily[0].temp.max)),
  };

  const threeDayForecast = data.daily.slice(1, 4).map((day) => ({
    dt_txt: day.dt * 1000,
    weather: day.weather,
    temp_min: Math.round(kelvinToCelsius(day.temp.min)),
    temp_max: Math.round(kelvinToCelsius(day.temp.max)),
  }));

  return { current: currentWeather, forecast: threeDayForecast };
};

const fetchAndSetWeather = async (
  lat,
  lon,
  setIsLoading,
  setError,
  setWeather,
  selectedCity,
  db,
) => {
  setIsLoading(true);
  try {
    let data;
    if (selectedCity) {
      data = await getWeatherByCity(selectedCity);

      const { lat, lon } = data.coord;
      data = await fetchWeather(lat, lon);
    } else {
      data = await fetchWeather(lat, lon);
    }
    setWeather(data);
    if (db) {
      await storeData(data, db);
    }
  } catch (error) {
    if (!navigator.onLine) {
      setError('No hay datos disponibles sin conexión a internet.');
    } else {
      setError(
        'Error al obtener los datos del clima. Por favor, vuelve a cargar la página.',
      );
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

const fetchFavorite = async (city, setIsLoading, setFavorites, setError) => {
  setIsLoading(true);
  try {
    const weatherData = await getWeatherByCity(city);
    const { lat, lon } = weatherData.coord;
    const data = await fetchWeather(lat, lon);
    setFavorites((prevFavorites) => [
      ...prevFavorites,
      { name: city, weather: data.current },
    ]);
  } catch (error) {
    if (!navigator.onLine) {
      setError('No hay datos disponibles sin conexión a internet.');
    } else {
      setError(
        'Error al obtener los datos del clima. Por favor, vuelve a cargar la página.',
      );
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

const storeData = async (data, db) => {
  const tx = db.transaction('weatherData', 'readwrite');
  const store = tx.objectStore('weatherData');
  await store.put(data, 'lastWeatherData');
};

const fetchStoredData = async (db, setWeather, setError) => {
  const tx = db.transaction('weatherData', 'readonly');
  const store = tx.objectStore('weatherData');
  const data = await store.get('lastWeatherData');

  if (data) {
    setWeather(data);
  }
};

export { fetchWeather, fetchAndSetWeather, fetchFavorite, fetchStoredData };
