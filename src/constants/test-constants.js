export const mockStoredData = {
  current: {
    dt: 1690219757,
    sunrise: 1690175063,
    sunset: 1690227480,
    temp: 303.14,
    feels_like: 301.76,
    pressure: 1011,
    humidity: 28,
    dew_point: 282.66,
    uvi: 1.39,
    clouds: 0,
    visibility: 10000,
    wind_speed: 7.72,
    wind_deg: 300,
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    name: 'Madrid',
    temp_min: 22,
    temp_max: 31,
  },
  forecast: [
    {
      dt_txt: 1690286400000,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      temp_min: 20,
      temp_max: 33,
    },
    {
      dt_txt: 1690372800000,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      temp_min: 20,
      temp_max: 34,
    },
    {
      dt_txt: 1690459200000,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      temp_min: 22,
      temp_max: 33,
    },
  ],
};

export const favorites = [
  {
    name: 'Madrid',
    weather: {
      dt: 1690225977,
      sunrise: 1690175059,
      sunset: 1690227478,
      temp: 300.56,
      feels_like: 299.72,
      pressure: 1013,
      humidity: 27,
      dew_point: 279.93,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 6.17,
      wind_deg: 300,
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      name: 'Madrid',
      temp_min: 22,
      temp_max: 31,
    },
  },
  {
    name: 'Cairo',
    weather: {
      dt: 1690226004,
      sunrise: 1690168118,
      sunset: 1690217641,
      temp: 306.57,
      feels_like: 311.93,
      pressure: 1004,
      humidity: 55,
      dew_point: 296.29,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 5.14,
      wind_deg: 310,
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' },
      ],
      name: 'Cairo',
      temp_min: 28,
      temp_max: 43,
    },
  },
];

export const mockContextWithData = {
  isLoading: false,
  setIsLoading: jest.fn().mockImplementation(() => {}),
  error: null,
  setError: jest.fn().mockImplementation(() => {}),
  weather: {
    current: {
      dt: 1690219757,
      sunrise: 1690175063,
      sunset: 1690227480,
      temp: 303.14,
      feels_like: 301.76,
      pressure: 1011,
      humidity: 28,
      dew_point: 282.66,
      uvi: 1.39,
      clouds: 0,
      visibility: 10000,
      wind_speed: 7.72,
      wind_deg: 300,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      name: 'Madrid',
      temp_min: 22,
      temp_max: 31,
    },
    forecast: [
      {
        dt_txt: 1690286400000,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        temp_min: 20,
        temp_max: 33,
      },
      {
        dt_txt: 1690372800000,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        temp_min: 20,
        temp_max: 34,
      },
      {
        dt_txt: 1690459200000,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        temp_min: 22,
        temp_max: 33,
      },
    ],
  },
  setWeather: jest.fn().mockImplementation(() => {}),
  selectedCity: 'Madrid',
};

export const mockContextWithoutData = {
  isLoading: false,
  setIsLoading: jest.fn().mockImplementation(() => {}),
  error: null,
  setError: jest.fn().mockImplementation(() => {}),
  weather: null,
  setWeather: jest.fn().mockImplementation(() => {}),
  selectedCity: null,
};
