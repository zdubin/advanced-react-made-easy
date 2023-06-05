import React from 'react';
import { render, screen } from '@testing-library/react';
import PlaceHolder from './PlaceHolder';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';

const initialState = {total:10};
const mockStore = configureStore()

test('renders PlaceHolder component', () => {
 const store = mockStore(initialState)
 render(<Provider store={store}><PlaceHolder /></Provider>);
 const linkElement = screen.getByText(/Result/i);
 expect(linkElement).toBeInTheDocument();
 const button = screen.getByRole('button', {
    name: /Force Call/i
  })
  expect(button).toBeInTheDocument();

});
