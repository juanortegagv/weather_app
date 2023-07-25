const citiesArray = [
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Zaragoza',
  'Málaga',
  'Murcia',
  'Tokyo',
  'Delhi',
  'Shanghai',
  'Mumbai',
  'Beijing',
  'Cairo',
  'Dhaka',
  'Osaka',
  'New York',
  'Karachi',
  'Buenos Aires',
  'Chongqing',
  'Istanbul',
  'Kolkata',
  'Manila',
  'Lagos',
  'Rio de Janeiro',
  'Tianjin',
  'Jakarta',
  'Lahore',
  'Shenzhen',
  'Seoul',
  'Guangzhou',
];

const formattedCities = citiesArray.map((city) => ({
  name: city,
  value: city.toLowerCase(),
}));

export const cities = formattedCities;
