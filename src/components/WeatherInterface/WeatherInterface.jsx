import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { CurrentWeather, CitySearch, Favorites } from "../index";
import { AppContext } from "../../context/AppContext";
import { fetchAndSetWeather } from "../../api/weatherData";

export const WeatherInterface = () => {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    weather,
    setWeather,
    selectedCity,
  } = useContext(AppContext);

  useEffect(() => {
    const initFetchWeather = async () => {
      if (selectedCity) {
        await fetchAndSetWeather(
          null,
          null,
          setIsLoading,
          setError,
          setWeather,
          selectedCity
        );
      } else {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        await fetchAndSetWeather(lat, lon, setIsLoading, setError, setWeather);
      }
    };

    initFetchWeather();
  }, [selectedCity]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center vh-100"
      style={{ maxWidth: "600px" }}
    >
      {isLoading ? (
        <Spinner
          animation="border"
          role="status"
          className="position-absolute text-primary"
          style={{ top: "50%" }}
        />
      ) : error ? (
        <Row
          className="w-50 justify-content-center align-items-center position-relative"
          style={{ maxWidth: "350px" }}
        >
          <Alert variant="danger" className="position-absolute">
            {error}
          </Alert>
        </Row>
      ) : (
        <Row className="w-100">
          <Col xs={12}>
            <CurrentWeather weather={weather} />
            <Row className="justify-content-center mt-4">
              <Favorites />
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WeatherInterface;
