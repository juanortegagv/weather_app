import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherInterface } from './components';
import { AppProvider } from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ db }) {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<WeatherInterface db={db} />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
App.propTypes = {
  db: PropTypes.object,
};
export default App;
