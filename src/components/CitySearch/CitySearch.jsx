import React, { useContext, useState } from 'react';
import { Form, Col, Dropdown } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import { cities } from '../../constants/cities';
import downArrow from '../../assets/icons/abajo-chevron.png';

const CitySearch = ({ weather }) => {
  const { setSelectedCity } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city.value);
    setShowDropdown(false);
  };

  return (
    <>
      {weather && (
        <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
          <Dropdown.Toggle
            variant="secondary"
            id="citySearchDropdown"
            className="bg-transparent border-0"
          >
            {/* <img src={downArrow} alt="down-arrow" /> */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form.Label className="text-white mb-2">
              Busqueda por ciudad
            </Form.Label>
            {cities.map((city, index) => (
              <Dropdown.Item key={index} onClick={() => handleCitySelect(city)}>
                {city.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default CitySearch;
