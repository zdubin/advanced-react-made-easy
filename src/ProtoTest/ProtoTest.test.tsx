import { render, screen } from '@testing-library/react';
import ProtoTest from './ProtoTest';

test('renders newTestObj fields/values, Cusip: and Value:', () => {
  render(<ProtoTest />);
  const linkElement = screen.getByText(/newTestObj fields\/values/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByText('Cusip: 12345')).toBeInTheDocument();
  expect(screen.getByText('Value: 55.55')).toBeInTheDocument();
});
