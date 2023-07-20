import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Col, ListGroup } from "react-bootstrap";

const Favorites = () => {
  const { favorites } = useContext(AppContext);
  console.log('favorites: ', favorites);
  return (
    <Col xs={12} md={6}>
      <h4 className="text-white">Favoritos</h4>
      {favorites?.length > 0 && (
        <ListGroup>
          {favorites.map((favorite, index) => (
            <p key={index} className="text-white">{favorite}</p>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default Favorites;
