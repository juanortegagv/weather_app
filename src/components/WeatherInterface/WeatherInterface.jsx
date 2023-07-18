import React, { useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { CurrentWeather } from "../index";
import { AppContext } from "../../context/AppContext";

export const WeatherInterface = () => {
  const { isLoading } = useContext(AppContext);

  return (
    <Container fluid className="d-flex justify-content-center">
      {isLoading ? (
        <Spinner animation="border" role="status" />
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
