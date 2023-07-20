import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import getDayOfWeek from "../../adapters/getDayOfWeek";
import { AppContext } from "../../context/AppContext";
import capitalizeWords from "../../adapters/capitalizeWords";
import CitySearch from "../CitySearch/CitySearch";
import save from "../../assets/icons/guardar.svg";
import saved from "../../assets/icons/guardado.svg";

const CurrentWeather = ({ weather }) => {
  const { selectedCity, toggleFavorite, favorites } = useContext(AppContext);
  const cityToAdd = selectedCity
    ? capitalizeWords(selectedCity)
    : weather?.current?.name;
  const isFavorite = favorites.includes(cityToAdd);

  const handleAddFavorite = () => {
    toggleFavorite(cityToAdd);
  };

  return (
    <>
      {weather && (
        <Row className="justify-content-center align-items-start pt-5 mx-auto">
          <Col xs={8}>
            <h1 className="text-white">
              {Math.round(weather.current.temp - 273.15)}°
            </h1>
            <h2 className="text-turquoise d-flex">
              {selectedCity
                ? capitalizeWords(selectedCity)
                : weather.current.name}
              <CitySearch weather={weather} />
            </h2>
            <h6 className="text-white">Hoy</h6>
            <Row>
              <Col xs={2}>
                <p className="h6 text-white"> {weather.current.temp_max}°</p>
              </Col>
              <Col xs={2}>
                <p className="h6 text-gray">{weather.current.temp_min}°</p>
              </Col>
              <Col xs={8}>
                <p className="text-blue-rain h6">
                  Humidity: {weather.current.humidity}
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            xs={4}
            className="d-flex justify-content-center p-0 position-relative"
          >
            <img
              src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt={weather.current.weather[0].description}
              style={{ width: "125px" }}
            />
            <img
              src={isFavorite ? saved : save}
              alt="icon-save"
              onClick={handleAddFavorite}
              className="save-icon"
            />
          </Col>
          <Col
            xs={12}
            className="border-top border-3 border-white justify-content-center mt-3"
          >
            {weather.forecast && (
              <Row>
                {weather.forecast.map((fweather, index) => {
                  return (
                    <Col
                      xs={4}
                      key={index}
                      className="p-0 align-items-center d-flex flex-column"
                    >
                      <img
                        src={`http://openweathermap.org/img/wn/${fweather.weather[0].icon}@2x.png`}
                        alt={fweather.weather[0].description}
                      />
                      <p className="h6 text-white">
                        {getDayOfWeek(fweather.dt_txt)}
                      </p>
                      <Row>
                        <p className="h6 text-white w-50">
                          {fweather.temp_max}°
                        </p>
                        <p className="h6 text-gray w-50">
                          {fweather.temp_min}°
                        </p>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default CurrentWeather;
