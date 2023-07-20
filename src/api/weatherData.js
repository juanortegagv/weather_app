import { getWeatherByLocation, getWeatherByCity } from "./weatherServices";

const kelvinToCelsius = (temp) => temp - 273.15;

const fetchWeather = async (lat, lon) => {
  const data = await getWeatherByLocation(lat, lon);
  const cityName = data.timezone.split("/")[1].replace(/[_-]/g, " ").trim();
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
  selectedCity
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
  } catch (error) {
    setError(
      "Error al obtener los datos del clima. Por favor, vuelve a cargar la página."
    );
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export { fetchWeather, fetchAndSetWeather };
