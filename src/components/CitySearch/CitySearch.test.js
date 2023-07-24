import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import CitySearch from './CitySearch';

describe('CitySearch', () => {
  let setSelectedCity;

  beforeEach(() => {
    setSelectedCity = jest.fn();
  });
  it('should render without crashing', () => {
    const mockContext = {
      setSelectedCity: setSelectedCity,
    };

    render(
      <AppContext.Provider value={mockContext}>
        <CitySearch weather={{}} />
      </AppContext.Provider>,
    );
  });
  it('should call setSelectedCity with city value when dropdown item is clicked', async () => {
    const mockContext = {
      setSelectedCity: setSelectedCity,
    };

    const { getByRole, findAllByRole } = render(
      <AppContext.Provider value={mockContext}>
        <CitySearch weather={{}} />
      </AppContext.Provider>,
    );

    const dropdownButton = getByRole('button', { name: '' });
    fireEvent.click(dropdownButton);

    const dropdownItems = await findAllByRole('button');
    fireEvent.click(dropdownItems[1]);
    expect(setSelectedCity).toHaveBeenCalledWith('madrid');
  });
});
