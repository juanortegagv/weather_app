import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

const db = {
  transaction: jest.fn(() => ({
    objectStore: jest.fn(() => ({
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })),
  })),
};

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App db={db} />);
  });
});
