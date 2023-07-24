import React, { createContext, useState, useEffect } from 'react';
import { fetchFavorite } from '../api/weatherData';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites')) || [],
  );

  const toggleFavorite = (city) => {
    const foundCity = favorites.find(
      (favoriteCity) => favoriteCity.name === city,
    );

    if (foundCity) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favoriteCity) => favoriteCity.name !== city),
      );
    } else {
      fetchFavorite(city, setIsLoading, setFavorites, setError);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        selectedCity,
        setSelectedCity,
        weather,
        setWeather,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
