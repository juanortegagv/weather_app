import React, { useContext } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { CurrentWeather } from "../index";
import { AppContext } from "../../context/AppContext";

export const WeatherInterface = () => {
  const { isLoading, error } = useContext(AppContext);

  return (
    <Container fluid className="d-flex justify-content-center vh-100">
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : error ? (
        <Row className="w-50 justify-content-center align-items-center position-relative" style={{maxWidth:"350px"}}>
          <Alert variant="danger" className="position-absolute">{error}</Alert>
        </Row>
      ) : (
        <Row className="w-100">
          <Col xs={12}>
            <CurrentWeather />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WeatherInterface;
