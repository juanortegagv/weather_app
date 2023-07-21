import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Col, ListGroup, Row } from 'react-bootstrap';
import saved from '../../assets/icons/guardado.svg';

const Favorites = () => {
  const { favorites, setSelectedCity, toggleFavorite } = useContext(AppContext);
  console.log('favorites: ', favorites);

  const handleFavoriteClick = (city) => {
    setSelectedCity(city);
  };
  return (
    <Col xs={12}>
      <h4 className="text-white favorites-title">Favoritos</h4>
      {favorites?.length > 0 && (
        <ListGroup className="my-4">
          {favorites.map((favorite, index) => (
            <Row className="position-relative my-2">
              <Col xs={3}>
                <p
                  key={index}
                  className="text-white m-0 favorites-paragraph"
                  onClick={() => handleFavoriteClick(favorite.name)}
                >
                  {favorite.name}
                </p>
              </Col>
              <Col xs={3} className="d-flex justify-content-center">
                <p className="h6 text-white m-0">
                  {' '}
                  {favorite.weather.temp_max}°
                </p>
              </Col>
              <Col xs={3} className="d-flex justify-content-center">
                <p className="h6 text-gray m-0">{favorite.weather.temp_min}°</p>
              </Col>
              <Col xs={3} className="d-flex justify-content-center">
                <img
                  src={saved}
                  alt="icon-saved"
                  onClick={() => toggleFavorite(favorite.name)}
                  className="saved-icon-favorites"
                />
              </Col>
            </Row>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default Favorites;
