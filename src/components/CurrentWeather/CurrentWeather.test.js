import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import CurrentWeather from './CurrentWeather';
import { mockStoredData as weather } from '../../constants/test-constants';

describe('CurrentWeather', () => {
  const toggleFavoriteMock = jest.fn();

  const mockContext = {
    selectedCity: 'Madrid',
    toggleFavorite: toggleFavoriteMock,
    favorites: [{ name: 'Madrid' }],
  };

  it('should render without crashing', () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <CurrentWeather weather={weather} />
      </AppContext.Provider>,
    );

    expect(getByText('Madrid')).toBeInTheDocument();
    expect(getByText('30°')).toBeInTheDocument();
    expect(getByText('Hoy')).toBeInTheDocument();
  });

  it('should call toggleFavorite when save icon is clicked', () => {
    const { getAllByAltText } = render(
      <AppContext.Provider value={mockContext}>
        <CurrentWeather weather={weather} />
      </AppContext.Provider>,
    );

    const saveIcons = getAllByAltText('icon-save');
    fireEvent.click(saveIcons[0]);
    expect(toggleFavoriteMock).toHaveBeenCalledWith('Madrid');
  });

  it('should render weather forecast data correctly', () => {
    const { getAllByText } = render(
      <AppContext.Provider value={mockContext}>
        <CurrentWeather weather={weather} />
      </AppContext.Provider>,
    );

    expect(getAllByText(/°/)).toHaveLength(9);
    expect(getAllByText('Humidity: 28')).toHaveLength(1);
  });
  it('should toggle favorite city correctly', () => {
    const toggleFavoriteMock = jest.fn();

    const mockContext = {
      selectedCity: 'Madrid',
      toggleFavorite: toggleFavoriteMock,
      favorites: [{ name: 'Madrid' }],
    };

    const { getByAltText } = render(
      <AppContext.Provider value={{ ...mockContext }}>
        <CurrentWeather weather={weather} />
      </AppContext.Provider>,
    );

    const toggleButton = getByAltText('icon-save');

    fireEvent.click(toggleButton);

    // Verificamos que toggleFavoriteMock se haya llamado con el nombre de la ciudad
    expect(toggleFavoriteMock).toHaveBeenCalledWith('Madrid');
  });
});
