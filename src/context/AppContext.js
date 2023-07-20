import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );

  const toggleFavorite = (city) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(city)) {
        return prevFavorites.filter((favoriteCity) => favoriteCity !== city);
      } else {
        return [...prevFavorites, city];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
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
