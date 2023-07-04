import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator component', () => {
  it('updates the total and current values correctly on button click', () => {
    render(
        <Calculator />
        );

    // Click on numbers
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    expect(screen.getByTestId('current')).toHaveTextContent('123');
    
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByTestId('total')).toHaveTextContent('123');
    expect(screen.getByTestId('current')).toHaveTextContent('0');
    
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('5'));
    expect(screen.getByTestId('current')).toHaveTextContent('45');

    fireEvent.click(screen.getByText('-'));
    expect(screen.getByTestId('total')).toHaveTextContent('78');
    expect(screen.getByTestId('current')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('2'));

    fireEvent.click(screen.getByText('*'));
    expect(screen.getByTestId('total')).toHaveTextContent('156');
    expect(screen.getByTestId('current')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('2'));

    fireEvent.click(screen.getByText('/'));
    expect(screen.getByTestId('total')).toHaveTextContent('78');
    expect(screen.getByTestId('current')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('C'));
    expect(screen.getByTestId('total')).toHaveTextContent('0');
    expect(screen.getByTestId('current')).toHaveTextContent('0');

  });
});
