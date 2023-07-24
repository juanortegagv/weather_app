import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { CurrentWeather, Favorites } from '../index';
import { AppContext } from '../../context/AppContext';
import { initFetchWeather } from '../../api/weatherData';

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
    initFetchWeather(selectedCity, setIsLoading, setError, setWeather, db);
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
