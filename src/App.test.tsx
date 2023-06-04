import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home Sweet Home.../i);
  expect(linkElement).toBeInTheDocument();
});
