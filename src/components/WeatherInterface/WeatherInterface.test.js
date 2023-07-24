import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppContext } from '../../context/AppContext';
import WeatherInterface from './WeatherInterface';
import * as weatherData from '../../api/weatherData';
import {
  mockContextWithData,
  mockStoredData,
  mockContextWithoutData,
} from '../../constants/test-constants';
// jest.mock('../../api/weatherData');

describe('WeatherInterface', () => {
  beforeEach(() => {
    jest.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(true);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render without crashing', () => {
    render(
      <AppContext.Provider value={mockContextWithoutData}>
        <WeatherInterface db={null} />
      </AppContext.Provider>,
    );
  });

  it('should correctly render error state', async () => {
    const context = {
      ...mockContextWithData,
      error: 'Error al obtener los datos del clima',
    };

    render(
      <AppContext.Provider value={context}>
        <WeatherInterface db={null} />
      </AppContext.Provider>,
    );

    await waitFor(() =>
      expect(screen.getByText(context.error)).toBeInTheDocument(),
    );
  });
  it('should fetch weather data based on geolocation when selectedCity is not available and online', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        success({
          coords: { latitude: 40.7128, longitude: -74.006 },
        }),
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    const context = {
      ...mockContextWithoutData,
      setIsLoading: jest.fn().mockImplementation(() => {}),
      setError: jest.fn().mockImplementation(() => {}),
      setWeather: jest.fn().mockImplementation(() => {}),
    };

    render(
      <AppContext.Provider value={context}>
        <WeatherInterface db={null} />
      </AppContext.Provider>,
    );

    await waitFor(() => {
      expect(context.setIsLoading).toHaveBeenCalledWith(true);
      expect(context.setError).not.toHaveBeenCalled();
      expect(context.setWeather).toHaveBeenCalledWith(expect.any(Object));
      expect(context.setWeather).toHaveBeenCalledWith(
        expect.objectContaining({
          current: expect.any(Object),
          forecast: expect.arrayContaining([
            expect.objectContaining({ dt_txt: expect.any(Number) }),
          ]),
        }),
      );
      expect(context.setIsLoading).toHaveBeenCalledWith(false);
    });
  });
});
