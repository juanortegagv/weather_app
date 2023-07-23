import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { CurrentWeather, Favorites } from '../index';
import { AppContext } from '../../context/AppContext';
import { fetchAndSetWeather, fetchStoredData } from '../../api/weatherData';

export const WeatherInterface = ({ db }) => {
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
      try {
        let data;

        if (navigator.onLine) {
          if (selectedCity) {
            data = await fetchAndSetWeather(
              null,
              null,
              setIsLoading,
              setError,
              setWeather,
              selectedCity,
              db,
            );
          } else {
            const position = await new Promise((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject),
            );
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await fetchAndSetWeather(
              lat,
              lon,
              setIsLoading,
              setError,
              setWeather,
              null,
              db,
            );
          }
        } else if (db) {
          await fetchStoredData(db, setWeather, setError);
        }
      } catch (error) {
        if (!navigator.onLine) {
          setError('No hay datos disponibles sin conexión a internet.');
        } else {
          setError(
            'Error al obtener los datos del clima. Por favor, vuelve a cargar la página.',
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    initFetchWeather();
  }, [selectedCity, db]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center vh-100"
      style={{ maxWidth: '600px' }}
    >
      {isLoading ? (
        <Spinner
          animation="border"
          role="status"
          className="position-absolute text-primary"
          style={{ top: '50%' }}
        />
      ) : error ? (
        <Row
          className="w-50 justify-content-center align-items-center position-relative"
          style={{ maxWidth: '350px' }}
        >
          <Alert variant="danger" className="position-absolute">
            {error}
          </Alert>
        </Row>
      ) : (
        <Row className="w-100">
          <Col xs={12}>
            <CurrentWeather weather={weather} />
            <Row className="justify-content-center mt-5">
              <Favorites />
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};
WeatherInterface.propTypes = {
  db: PropTypes.object,
};
export default WeatherInterface;
