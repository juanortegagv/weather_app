import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  getWeatherByLocation,
  getWeatherForecast,
} from "../../api/weatherServices";
import { AppContext } from "../../context/AppContext";
import getThreeDayForecast from "../../adapters/getThreeDayForecastAdapter";
import getDayOfWeek from "../../adapters/getDayOfWeek";

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);
  const { isLoading, setIsLoading } = useContext(AppContext);
  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const [currentWeather, weatherForecast] = await Promise.all([
          getWeatherByLocation(latitude, longitude),
          getWeatherForecast(latitude, longitude),
        ]);

        const threeDayForecast = getThreeDayForecast(weatherForecast);
        setWeather({ current: currentWeather, forecast: threeDayForecast });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Container fluid className="pt-5" style={{ maxWidth: "600px" }}>
      {weather ? (
        <Row className="justify-content-center align-items-start">
          <Col xs={8}>
            <h1 className="text-white">
              {Math.round(weather.current.main.temp - 273.15)}°
            </h1>
            <h2 className="text-turquoise">{weather.current.name}</h2>
            <h6 className="text-white">Hoy</h6>
            <Row>
              <Col xs={2}>
                <p className="h6 text-white">
                  {" "}
                  {Math.round(weather.current.main.temp_max - 273.15)}°
                </p>
              </Col>
              <Col xs={2}>
                <p className="h6 text-gray">
                  {Math.round(weather.current.main.temp_min - 273.15)}°
                </p>
              </Col>
              <Col xs={8}>
                <p className="text-blue-rain h6">
                  Humidity:{weather.current.main.humidity}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={4} className="d-flex justify-content-center p-0">
            <img
              src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt={weather.current.weather[0].description}
              style={{ width: "125px" }}
            />
          </Col>
          <Col
            xs={12}
            className="border-top border-3 border-white justify-content-center"
          >
            {weather.forecast && (
              <Row>
                {weather.forecast.map((fweather) => {
                  return (
                    <Col xs={4}>
                      <img
                        src={`http://openweathermap.org/img/wn/${fweather.weather[0].icon}@2x.png`}
                        alt={fweather.weather[0].description}
                      />
                      <p className="h6 text-white">
                        {getDayOfWeek(fweather.dt_txt)}
                      </p>
                      <Row>
                        <p className="h6 text-white w-50">{fweather.temp_max}°</p>
                        <p className="h6 text-gray w-50">{fweather.temp_min}°</p>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      ) : (
        <Spinner animation="border" role="status" />
      )}
    </Container>
  );
};

export default CurrentWeather;
