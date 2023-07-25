import axios from 'axios';

const API_KEY = '74dd4f95b2a24429c45474682879a101';

export const getWeatherByLocation = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherByCity = async (city) => {
  try {
    let response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
