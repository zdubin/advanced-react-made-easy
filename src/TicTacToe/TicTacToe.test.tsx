import { render, fireEvent, screen } from '@testing-library/react';
import TicTacToe from './TicTacToe';

test('renders TicTacToe component', () => {
    render(<TicTacToe />);
    const linkElement = screen.getByText(/Turn X/i);
    expect(linkElement).toBeInTheDocument();
});

test('clicking on a square changes the turn', () => {
    render(<TicTacToe />);
    const square = screen.getByTestId('square-0-0');
    fireEvent.click(square);
    expect(screen.getByTestId('row-0-0')).toHaveTextContent('X');
    expect(screen.getByTestId('turn')).toHaveTextContent('Turn O');
});

test('clicking on certain squares causes X to win', () => {
    render(<TicTacToe />);
    const square00 = screen.getByTestId('square-0-0'); // X
    fireEvent.click(square00);
    const square02 = screen.getByTestId('square-0-2'); // O
    fireEvent.click(square02);

    const square10 = screen.getByTestId('square-1-0'); // X
    fireEvent.click(square10);
    const square12 = screen.getByTestId('square-1-2'); // O
    fireEvent.click(square12);

    const square20 = screen.getByTestId('square-2-0'); // X
    fireEvent.click(square20);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('** X Won**');
});