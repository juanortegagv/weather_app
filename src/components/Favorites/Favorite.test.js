import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import Favorites from './Favorites';
import { favorites } from '../../constants/test-constants';

describe('Favorites', () => {
  const setSelectedCityMock = jest.fn();
  const toggleFavoriteMock = jest.fn();

  const mockContext = {
    favorites,
    setSelectedCity: setSelectedCityMock,
    toggleFavorite: toggleFavoriteMock,
  };

  it('should render without crashing', () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <Favorites />
      </AppContext.Provider>,
    );

    expect(getByText('Favoritos')).toBeInTheDocument();
    expect(getByText('Madrid')).toBeInTheDocument();
    expect(getByText('Cairo')).toBeInTheDocument();
  });

  it('should call setSelectedCity when city name is clicked', () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <Favorites />
      </AppContext.Provider>,
    );

    fireEvent.click(getByText('Madrid'));
    expect(setSelectedCityMock).toHaveBeenCalledWith('Madrid');
  });

  it('should call toggleFavorite when save icon is clicked', () => {
    const { getAllByAltText } = render(
      <AppContext.Provider value={mockContext}>
        <Favorites />
      </AppContext.Provider>,
    );

    const saveIcons = getAllByAltText('icon-saved');
    fireEvent.click(saveIcons[0]);
    expect(toggleFavoriteMock).toHaveBeenCalledWith('Madrid');
  });
});
