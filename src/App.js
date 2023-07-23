import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherInterface } from './components';
import { AppProvider } from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<WeatherInterface />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
