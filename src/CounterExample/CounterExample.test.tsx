import { render, fireEvent, screen, act } from '@testing-library/react';
import CounterExample from './CounterExample';
import { UserContext } from "../App";
describe('CounterExample', () => {
  it('should render the component', () => {
    render(<CounterExample initialValue={0}/>);
    expect(screen.getByText(/Counter is/)).toBeInTheDocument();
  });

  it('should increment the counter on button click', () => {
    render(<CounterExample initialValue={0}/>);
    const button = screen.getByText(/Instant increment/);
    fireEvent.click(button);

    act(() => {
        expect(screen.getByText(/Counter is 1/)).toBeInTheDocument();
    });
  }); 


  test('handleName function is called with correct argument', () => {
    const setName = jest.fn();
    const name = 'Zvi';
    const lastName = 'Dubin';
  
    render(
      <UserContext.Provider value={{ name, lastName, setName }}>
        <CounterExample initialValue={0}/>
      </UserContext.Provider>
    );
  
    const button = screen.getByRole('button', { name: /Name change/i });
    fireEvent.click(button);
  
    expect(setName).toHaveBeenCalledWith(`${name}0`);
  });
    

});

